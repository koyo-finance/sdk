import type { SupportedChainId } from '@cowprotocol/cow-sdk';
import { CowApi } from '@cowprotocol/cow-sdk/dist/api';
import type { Context, Env } from '@cowprotocol/cow-sdk/dist/utils/context';
import type { ChainId } from '@koyofinance/core-sdk';
import { CHAIN_MOMIJI_ORDERBOOK_API } from '../../constants';

export class MomijiOrderbookApi extends CowApi {
	public constructor(chainId: ChainId, env: Env, appDataHash: string) {
		super({
			chainId,
			env,
			appDataHash
		} as unknown as Context);

		this.API_NAME = 'Momiji';
		// eslint-disable-next-line @typescript-eslint/unbound-method
		this.API_URL_GETTER = MomijiOrderbookApi.getMomijiProtocolApiUrl;
	}

	public static getMomijiProtocolApiUrl(_env: Env) {
		return CHAIN_MOMIJI_ORDERBOOK_API as unknown as Record<SupportedChainId, string>;
	}
}
