import type { QuoteQuery } from '@cowprotocol/contracts';
import type {
	FeeQuoteParams,
	GetOrdersParams,
	GetTradesParams,
	OrderCancellationParams,
	OrderID,
	OrderMetaData,
	PriceInformation,
	PriceQuoteLegacyParams,
	SimpleGetQuoteResponse,
	TradeMetaData
} from '@cowprotocol/cow-sdk';
import { ZERO_ADDRESS } from '@koyofinance/core-sdk';
import log from 'loglevel';
import { logPrefix } from '../../../constants';
import { OrderKind } from '../../../enums';
import { getSigningSchemeApiValue, objectToQueryString } from '../../../functions';
import type { ApiOptions, Context, OrderCreation, SupportedChainsList } from '../../../types';
import { MomijiError, toErc20Address } from '../../../utils';
import { BaseApi } from './BaseApi';
import OperatorError, { ApiErrorCodeDetails, ApiErrorCodes, ApiErrorObject } from './OperatorError';
import { GpQuoteError, GpQuoteErrorCodes, GpQuoteErrorDetails, GpQuoteErrorObject, mapOperatorErrorToQuoteError } from './QuoteError';

const API_URL_VERSION = 'v1';

const UNHANDLED_QUOTE_ERROR: GpQuoteErrorObject = {
	errorType: GpQuoteErrorCodes.UNHANDLED_ERROR,
	description: GpQuoteErrorDetails.UNHANDLED_ERROR
};

const UNHANDLED_ORDER_ERROR: ApiErrorObject = {
	errorType: ApiErrorCodes.UNHANDLED_CREATE_ERROR,
	description: ApiErrorCodeDetails.UNHANDLED_CREATE_ERROR
};

async function _handleQuoteResponse<T = unknown, P extends QuoteQuery = QuoteQuery>(response: Response, params?: P): Promise<T> {
	if (response.ok) return response.json();
	const responseContentType = response.headers.get('Content-Type');
	if (responseContentType === 'application/json') {
		const errorObj: ApiErrorObject = await response.json();

		// we need to map the backend error codes to match our own for quotes
		const mappedError = mapOperatorErrorToQuoteError(errorObj);
		const quoteError = new GpQuoteError(mappedError);

		if (params) {
			const { sellToken, buyToken } = params;
			log.error(logPrefix, `Error querying fee from API - sellToken: ${sellToken}, buyToken: ${buyToken}`);
		}

		throw quoteError;
	} else {
		const text = await response.text();
		throw new GpQuoteError({
			description: text,
			errorType: GpQuoteErrorCodes.UNHANDLED_ERROR
		});
	}
}

export class CowApi extends BaseApi {
	public constructor(context: Context) {
		super({ context, name: 'CoW Protocol', apiVersion: API_URL_VERSION, getApiUrl: () => ({}) });
	}

	public async getTrades(params: GetTradesParams, ApiOptions: ApiOptions = {}): Promise<TradeMetaData[]> {
		const { chainId: networkId, env = this.context.env } = ApiOptions;
		const { owner, orderId } = params;
		if (owner && orderId) {
			throw new MomijiError('Cannot specify both owner and orderId');
		}
		const qsParams = objectToQueryString({ owner, orderUid: orderId });
		const chainId = networkId || (await this.context.chainId);
		log.debug(logPrefix, '[util:operator] Get trades for', chainId, { owner, orderId });
		try {
			const response = await this.get(`/trades${qsParams}`, { chainId, env });

			if (response.ok) return response.json();

			const errorResponse = await response.json();
			throw new OperatorError(errorResponse);
		} catch (error) {
			log.error(logPrefix, 'Error getting trades:', error);
			if (error instanceof OperatorError) throw error;

			throw new MomijiError(`Error getting trades: ${error}`);
		}
	}

	public async getOrders(params: GetOrdersParams, ApiOptions: ApiOptions = {}): Promise<OrderMetaData[]> {
		const { chainId: networkId, env = this.context.env } = ApiOptions;
		const { owner, limit = 1000, offset = 0 } = params;
		const queryString = objectToQueryString({ limit, offset });
		const chainId = networkId || (await this.context.chainId);
		log.debug(logPrefix, `[api:${this.API_NAME}] Get orders for `, chainId, owner, limit, offset);

		try {
			const response = await this.get(`/account/${owner}/orders/${queryString}`, { chainId, env });

			if (response.ok) return response.json();

			const errorResponse: ApiErrorObject = await response.json();
			throw new OperatorError(errorResponse);
		} catch (error) {
			log.error(logPrefix, 'Error getting orders information:', error);
			if (error instanceof OperatorError) throw error;

			throw new OperatorError(UNHANDLED_ORDER_ERROR);
		}
	}

	public async getTxOrders(txHash: string, ApiOptions: ApiOptions = {}): Promise<OrderMetaData[]> {
		const { chainId: networkId, env } = ApiOptions;
		const chainId = networkId || (await this.context.chainId);
		log.debug(`[api:${this.API_NAME}] Get tx orders for `, chainId, txHash);

		try {
			const response = await this.get(`/transactions/${txHash}/orders`, { chainId, env });

			if (response.ok) return response.json();

			const errorResponse: ApiErrorObject = await response.json();
			throw new OperatorError(errorResponse);
		} catch (error) {
			log.error('Error getting transaction orders information:', error);
			if (error instanceof OperatorError) throw error;
			throw new OperatorError(UNHANDLED_ORDER_ERROR);
		}
	}

	public async getOrder(orderId: string, ApiOptions: ApiOptions = {}): Promise<OrderMetaData | null> {
		const { chainId: networkId, env } = ApiOptions;
		const chainId = networkId || (await this.context.chainId);
		log.debug(logPrefix, `[api:${this.API_NAME}] Get order for `, chainId, orderId);
		try {
			const response = await this.get(`/orders/${orderId}`, { chainId, env });

			if (response.ok) return response.json();

			const errorResponse: ApiErrorObject = await response.json();
			throw new OperatorError(errorResponse);
		} catch (error) {
			log.error(logPrefix, 'Error getting order information:', error);
			if (error instanceof OperatorError) throw error;

			throw new OperatorError(UNHANDLED_ORDER_ERROR);
		}
	}

	public async getPriceQuoteLegacy(params: PriceQuoteLegacyParams, ApiOptions: ApiOptions = {}): Promise<PriceInformation | null> {
		const { chainId: networkId, env } = ApiOptions;
		const { baseToken, quoteToken, amount, kind } = params;
		const chainId = networkId || (await this.context.chainId);
		log.debug(logPrefix, `[api:${this.API_NAME}] Get price from API`, params, 'for', chainId);

		const response = await this.get(`/markets/${toErc20Address(baseToken, chainId)}-${toErc20Address(quoteToken, chainId)}/${kind}/${amount}`, {
			chainId,
			env
		}).catch((error) => {
			log.error(logPrefix, 'Error getting price quote:', error);
			throw new GpQuoteError(UNHANDLED_QUOTE_ERROR);
		});

		return _handleQuoteResponse<PriceInformation | null>(response);
	}

	public async getQuoteLegacyParams(params: FeeQuoteParams, ApiOptions: ApiOptions = {}): Promise<SimpleGetQuoteResponse> {
		const { chainId: networkId, env } = ApiOptions;
		const chainId = networkId || (await this.context.chainId);
		const quoteParams = this.mapNewToLegacyParams(params, chainId);
		const response = await this.post('/quote', quoteParams, { chainId, env });

		return _handleQuoteResponse<SimpleGetQuoteResponse>(response);
	}

	public async getQuote(params: QuoteQuery, ApiOptions: ApiOptions = {}): Promise<SimpleGetQuoteResponse> {
		const { chainId: networkId, env } = ApiOptions;
		const chainId = networkId || (await this.context.chainId);
		const response = await this.post('/quote', params, { chainId, env });

		return _handleQuoteResponse<SimpleGetQuoteResponse>(response);
	}

	public async sendSignedOrderCancellation(params: OrderCancellationParams, ApiOptions: ApiOptions = {}): Promise<void> {
		const { chainId: networkId, env } = ApiOptions;
		const { cancellation, owner: from } = params;
		const chainId = networkId || (await this.context.chainId);
		log.debug(logPrefix, `[api:${this.API_NAME}] Delete signed order for network`, chainId, cancellation);

		const response = await this.delete(
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			`/orders/${cancellation.orderUid}`,
			{
				signature: cancellation.signature,
				signingScheme: getSigningSchemeApiValue(cancellation.signingScheme),
				from
			},
			{ chainId, env }
		);

		if (!response.ok) {
			// Raise an exception
			const errorMessage = await OperatorError.getErrorFromStatusCode(response, 'delete');
			throw new MomijiError(errorMessage);
		}

		log.debug(logPrefix, `[api:${this.API_NAME}] Cancelled order`, cancellation.orderUid, chainId);
	}

	public async sendOrder(params: { order: Omit<OrderCreation, 'appData'>; owner: string }, ApiOptions: ApiOptions = {}): Promise<OrderID> {
		const fullOrder: OrderCreation = { ...params.order, appData: this.context.appDataHash };
		const { chainId: networkId, env } = ApiOptions;
		const chainId = networkId || (await this.context.chainId);
		const { owner } = params;
		log.debug(logPrefix, `[api:${this.API_NAME}] Post signed order for network`, chainId, fullOrder);

		// Call API
		const response = await this.post(
			`/orders`,
			{
				...fullOrder,
				signingScheme: getSigningSchemeApiValue(fullOrder.signingScheme),
				from: owner
			},
			{ chainId, env }
		);

		// Handle response
		if (!response.ok) {
			// Raise an exception
			const errorMessage = await OperatorError.getErrorFromStatusCode(response, 'create');
			throw new MomijiError(errorMessage);
		}

		const uid = (await response.json()) as string;
		log.debug(logPrefix, `[api:${this.API_NAME}] Success posting the signed order`, uid);
		return uid;
	}

	public async getOrderLink(orderId: OrderID): Promise<string> {
		const baseUrl = await this.getApiBaseUrl();

		return `${baseUrl}/orders/${orderId}`;
	}

	protected getApiBaseUrl(): Promise<string> {
		return super.getApiBaseUrl(this.context.env);
	}

	private mapNewToLegacyParams(params: FeeQuoteParams, chainId: SupportedChainsList): QuoteQuery {
		const { amount, kind, userAddress, receiver, validTo, sellToken, buyToken } = params;
		const fallbackAddress = userAddress || ZERO_ADDRESS;

		const baseParams = {
			sellToken: toErc20Address(sellToken, chainId),
			buyToken: toErc20Address(buyToken, chainId),
			from: fallbackAddress,
			receiver: receiver || fallbackAddress,
			appData: this.context.appDataHash,
			validTo,
			partiallyFillable: false
		};

		const finalParams: QuoteQuery =
			kind === OrderKind.SELL
				? {
						kind: OrderKind.SELL,
						sellAmountBeforeFee: amount,
						...baseParams
				  }
				: {
						kind: OrderKind.BUY,
						buyAmountAfterFee: amount,
						...baseParams
				  };

		return finalParams;
	}
}
