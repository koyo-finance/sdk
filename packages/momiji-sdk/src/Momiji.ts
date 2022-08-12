import { MaxUint256 } from '@ethersproject/constants';
import { mergeDefault } from '@sapphire/utilities';
import { BigNumber, providers } from 'ethers';
import { joinSignature, splitSignature, _TypedDataEncoder } from 'ethers/lib/utils';
import {
	CHAIN_KOYO_GP_V2_SETTLEMENT_ADDRESS,
	DEFAULT_APP_DATA_HASH,
	KOYO_GP_V2_SETTLEMENT_SIGNING_NAME,
	KOYO_GP_V2_SETTLEMENT_SIGNING_VERSION,
	MOMIJI_DEFAULT_CONFIGURATION,
	ORDER_CREATION_TYPE_FIELDS,
	SUPPORTED_CHAINS
} from './constants';
import { OrderBalance, SigningScheme } from './enums';
import { getBalanceAndApproval } from './functions';
import { MomijiOrderbookApi, MomijiSubgraphApi } from './services';
import type {
	ApprovalAction,
	CreateOrderAction,
	CreateOrderActionResult,
	MomijiConfiguration,
	OrderUseCase,
	Signer,
	SigningResult,
	SupportedChainsList,
	UnsignedOrder,
	UnsignedUserOrder
} from './types';
import { ERC20__factory } from './types/contracts/util';
import { executeAllActions, getTransactionMethods } from './utils';

export class Momiji {
	public readonly chainId: SupportedChainsList;
	public readonly provider: providers.Provider;

	public readonly orderbookService: MomijiOrderbookApi;
	public readonly subgraphService: MomijiSubgraphApi;

	readonly #signer?: Signer;
	private readonly configuration: Required<MomijiConfiguration>;
	private readonly appdata: string;

	public constructor(
		chainId: SupportedChainsList,
		providerOrSigner: providers.JsonRpcProvider | Signer,
		configuration?: MomijiConfiguration,
		appdata?: string
	) {
		this.chainId = chainId;
		const provider = providerOrSigner instanceof providers.Provider ? providerOrSigner : providerOrSigner.provider;
		this.#signer = (providerOrSigner as Signer)._isSigner ? (providerOrSigner as Signer) : undefined;

		this.configuration = mergeDefault(MOMIJI_DEFAULT_CONFIGURATION, configuration);
		this.appdata = appdata || DEFAULT_APP_DATA_HASH;

		if (!SUPPORTED_CHAINS.includes(chainId)) throw new Error('Selected chain is not supported');
		if (!provider) throw new Error('Either a provider or custom signer with provider must be provided');

		this.provider = provider;
		this.orderbookService = new MomijiOrderbookApi(chainId, this.configuration.env, this.appdata);
		this.subgraphService = new MomijiSubgraphApi(chainId);
	}

	public async createOrder(order: UnsignedUserOrder, signerAddress?: string): Promise<OrderUseCase<CreateOrderAction>> {
		const signer = this._getSigner(signerAddress);
		const accountAddress = await signer.getAddress();

		const settlementContract = CHAIN_KOYO_GP_V2_SETTLEMENT_ADDRESS[this.chainId];
		const balanceAndApproval = await getBalanceAndApproval(accountAddress, order.sellToken, settlementContract, this.provider);

		if (this.configuration.throwOnInsufficientBalance && BigNumber.from(order.sellAmount).gt(balanceAndApproval.balance))
			throw new Error('The signer does not have the amount needed to create the order.');
		if (this.configuration.throwOnInsufficientApproval && BigNumber.from(order.sellAmount).gt(balanceAndApproval.approvedAmount))
			throw new Error('The signer does not have the sufficient approvals.');

		const approvalAction: ApprovalAction[] = BigNumber.from(order.sellAmount).gt(balanceAndApproval.approvedAmount)
			? [
					{
						type: 'approval',
						asset: order.sellToken,
						transactionMethods: getTransactionMethods(ERC20__factory.connect(order.sellToken, signer), 'approve', [
							settlementContract,
							MaxUint256
						]),
						operator: '0x8bbbD0e8a5A40f761162645E2a4E0f1C090Edf4B'
					}
			  ]
			: [];

		const createOrderAction = {
			type: 'create',
			getMessageToSign: () => {
				return this._getOrderCreationMessageToSign(order, this.appdata);
			},
			createOrder: async (): Promise<CreateOrderActionResult> => {
				const signature = await this.signOrderCreation(order, this.appdata);

				return {
					parameters: order,
					...signature
				};
			}
		} as const;

		const submitOrderAction = {
			type: 'submit',
			submit: async (signedOrder: SigningResult): Promise<string> => {
				return this.orderbookService.sendOrder({
					order: { ...order, ...signedOrder },
					owner: await signer.getAddress()
				});
			}
		} as const;

		const actions = [...approvalAction, createOrderAction, submitOrderAction] as const;

		return {
			actions,
			executeAllActions: () => executeAllActions(actions) as Promise<CreateOrderActionResult>
		};
	}

	public async signOrderCreation(orderCreationParameters: UnsignedUserOrder, appDataHash: string, accountAddress?: string): Promise<SigningResult> {
		const signer = this._getSigner(accountAddress);

		const order: UnsignedOrder = {
			...orderCreationParameters,
			appData: appDataHash
		};

		const domainData = this._getDomainData();
		const signature = await signer._signTypedData(domainData, ORDER_CREATION_TYPE_FIELDS, order);

		// Passing the signature through split/join to normalize the `v` byte.
		// Some wallets do not pad it with `27`, which causes a signature failure
		// `splitSignature` pads it if needed, and `joinSignature` simply puts it back together
		return {
			signature: joinSignature(splitSignature(signature)),
			signingScheme: SigningScheme.EIP712
		};
	}

	private _getSigner(accountAddress?: string): Signer {
		if (this.#signer) {
			return this.#signer;
		}

		if (!(this.provider instanceof providers.JsonRpcProvider)) {
			throw new Error('Either signer or a JsonRpcProvider must be provided');
		}

		return this.provider.getSigner(accountAddress);
	}

	private _getDomainData() {
		return {
			name: KOYO_GP_V2_SETTLEMENT_SIGNING_NAME,
			version: KOYO_GP_V2_SETTLEMENT_SIGNING_VERSION,
			chainId: this.chainId,
			verifyingContract: CHAIN_KOYO_GP_V2_SETTLEMENT_ADDRESS[this.chainId]
		};
	}

	private _getOrderCreationMessageToSign(orderCreationParameters: UnsignedUserOrder, appDataHash: string) {
		const domainData = this._getDomainData();

		const order: UnsignedOrder = {
			sellTokenBalance: OrderBalance.ERC20,
			buyTokenBalance: OrderBalance.ERC20,
			...orderCreationParameters,
			appData: appDataHash
		};

		return JSON.stringify(_TypedDataEncoder.getPayload(domainData, ORDER_CREATION_TYPE_FIELDS, order));
	}
}
