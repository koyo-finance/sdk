import {
	AddChainError,
	ChainNotConfiguredError,
	ConnectorNotFoundError,
	normalizeChainId,
	SwitchChainError,
	UserRejectedRequestError
} from '@wagmi/core';
import { getClient } from '@wagmi/core/dist/declarations/src/client';
import { providers } from 'ethers';
import { getAddress, hexValue } from 'ethers/lib/utils';
import { allChains, Chain, Connector } from 'wagmi';

export interface ONTOConnectorOptions {
	shimDisconnect?: boolean;
}

export const ontoShimKey = 'onto.shimDisconnect';

export class ONTOConnector extends Connector<Window['ethereum'], ONTOConnectorOptions | undefined> {
	public readonly id: string;
	public readonly name: string;

	// @ts-expect-error We know that "isONTO" could be present. https://publicdocs.gitbook.io/onto/integrate-onto-in-mobile-dapp
	public readonly ready = typeof window !== 'undefined' && Boolean(window?.ethereum) && Boolean(window?.ethereum?.isONTO);

	#provider?: Window['ethereum'];

	public constructor({
		chains,
		options = { shimDisconnect: true }
	}: {
		chains?: Chain[];
		options?: ONTOConnectorOptions;
	} = {}) {
		super({ chains, options });

		let name = 'Onto';
		if (typeof window !== 'undefined') {
			// @ts-expect-error We know that "isONTO" could be present. https://publicdocs.gitbook.io/onto/integrate-onto-in-mobile-dapp
			const detectedName = !window.ethereum || !window?.ethereum?.isONTO ? 'Injected' : 'Onto';
			if (detectedName) name = detectedName;
		}

		this.id = 'onto';
		this.name = name;
	}

	public async connect() {
		try {
			const provider = await this.getProvider();
			if (!provider) throw new ConnectorNotFoundError();

			if (provider.on) {
				provider.on('accountsChanged', this.onAccountsChanged);
				provider.on('chainChanged', this.onChainChanged);
				provider.on('disconnect', this.onDisconnect);
			}

			this.emit('message', { type: 'connecting' });

			const account = await this.getAccount();
			const id = await this.getChainId();
			const unsupported = this.isChainUnsupported(id);

			if (this.options?.shimDisconnect) getClient().storage?.setItem(ontoShimKey, true);

			return { account, chain: { id, unsupported }, provider };
		} catch (error) {
			if ((<ProviderRpcError>error).code === 4001) throw new UserRejectedRequestError();
			throw error;
		}
	}

	public async disconnect() {
		const provider = await this.getProvider();
		if (!provider?.removeListener) return;

		provider.removeListener('accountsChanged', this.onAccountsChanged);
		provider.removeListener('chainChanged', this.onChainChanged);
		provider.removeListener('disconnect', this.onDisconnect);

		if (this.options?.shimDisconnect) getClient().storage?.removeItem(ontoShimKey);
	}

	public async getAccount() {
		const provider = await this.getProvider();
		if (!provider) throw new ConnectorNotFoundError();
		const accounts = await provider.request({
			method: 'eth_requestAccounts'
		});
		// return checksum address
		return getAddress(accounts[0]);
	}

	public async getChainId() {
		const provider = await this.getProvider();
		if (!provider) throw new ConnectorNotFoundError();
		return provider //
			.request({ method: 'eth_chainId' })
			.then(normalizeChainId);
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async getProvider() {
		if (this.ready) this.#provider = window.ethereum;
		return this.#provider;
	}

	public async getSigner() {
		const [provider, account] = await Promise.all([this.getProvider(), this.getAccount()]);
		return new providers.Web3Provider(<providers.ExternalProvider>provider).getSigner(account);
	}

	public async isAuthorized() {
		try {
			if (this.options?.shimDisconnect && !getClient().storage?.getItem(ontoShimKey)) return false;

			const provider = await this.getProvider();
			if (!provider) throw new ConnectorNotFoundError();
			const accounts = await provider.request({
				method: 'eth_accounts'
			});
			const account = accounts[0];
			return Boolean(account);
		} catch {
			return false;
		}
	}

	public async switchChain(chainId: number) {
		const provider = await this.getProvider();
		if (!provider) throw new ConnectorNotFoundError();
		const id = hexValue(chainId);

		try {
			await provider.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: id }]
			});
			const chains = [...this.chains, ...allChains];
			return (
				chains.find((x) => x.id === chainId) ?? {
					id: chainId,
					name: `Chain ${id}`,
					rpcUrls: { default: '' }
				}
			);
		} catch (error) {
			// Indicates chain is not added to provider
			if ((<ProviderRpcError>error).code === 4902) {
				try {
					const chain = this.chains.find((x) => x.id === chainId);
					if (!chain) throw new ChainNotConfiguredError();
					await provider.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: id,
								chainName: chain.name,
								nativeCurrency: chain.nativeCurrency,
								rpcUrls: [chain.rpcUrls.default],
								blockExplorerUrls: this.getBlockExplorerUrls(chain)
							}
						]
					});
					return chain;
				} catch (addError) {
					throw new AddChainError();
				}
			} else if ((<ProviderRpcError>error).code === 4001) throw new UserRejectedRequestError();
			else throw new SwitchChainError();
		}
	}

	public async watchAsset({ address, decimals = 18, image, symbol }: { address: string; decimals?: number; image?: string; symbol: string }) {
		const provider = await this.getProvider();
		if (!provider) throw new ConnectorNotFoundError();
		return provider.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address,
					decimals,
					image,
					symbol
				}
			}
		});
	}

	protected onAccountsChanged = (accounts: string[]) => {
		if (accounts.length === 0) this.emit('disconnect');
		else this.emit('change', { account: getAddress(accounts[0]) });
	};

	protected onChainChanged = (chainId: number | string) => {
		const id = normalizeChainId(chainId);
		const unsupported = this.isChainUnsupported(id);
		this.emit('change', { chain: { id, unsupported } });
	};

	protected onDisconnect = () => {
		this.emit('disconnect');
		if (this.options?.shimDisconnect) getClient().storage?.removeItem(ontoShimKey);
	};
}
