import type { QuoteQuery } from '@cowprotocol/contracts';
import type { JsonRpcProvider } from '@ethersproject/providers';
import { ZERO_ADDRESS } from '@koyofinance/core-sdk';
import { Momiji, OrderKind, SupportedChainsList, SUPPORTED_CHAINS } from '@koyofinance/momiji-sdk';
import { mergeDefault } from '@sapphire/utilities';
import { useQuery } from 'react-query';

export interface QouteParamsCommon {}
export type QouteParams = QouteParamsCommon & QuoteQuery;

export interface MetaQueryOptions {
	provider?: JsonRpcProvider;
	chainId?: SupportedChainsList;

	refetchInterval?: number;
	enabled?: boolean;
}

export const DEFAULT_QUOTE_PARAMS: Partial<QouteParams> = {
	kind: OrderKind.SELL,
	partiallyFillable: false,
	from: ZERO_ADDRESS,
	receiver: ZERO_ADDRESS
};

export function useGetQoute(params: QouteParams, options: MetaQueryOptions) {
	const defaultedParams = mergeDefault(DEFAULT_QUOTE_PARAMS, params);

	const queryResult = useQuery(
		[
			'momijiQuote',
			defaultedParams.kind,
			defaultedParams.sellToken,
			defaultedParams.buyToken,
			defaultedParams.from,
			defaultedParams.validTo.toString(),
			defaultedParams.partiallyFillable
		],
		{
			queryFn: async () => {
				const momiji = new Momiji(options.chainId || SUPPORTED_CHAINS[0], options.provider!);

				return momiji.orderbookService.getQuote(defaultedParams);
			},
			refetchInterval: options.refetchInterval || 5 * 1000,
			enabled: Boolean(options.provider) && options.enabled
		}
	);

	return queryResult;
}
