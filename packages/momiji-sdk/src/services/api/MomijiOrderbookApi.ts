import type { ChainId } from '@koyofinance/core-sdk';
import { CHAIN_MOMIJI_ORDERBOOK_API } from '../../constants';
import type { Context, Env } from '../../types';
import { CowApi } from './cow';

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
		return CHAIN_MOMIJI_ORDERBOOK_API;
	}
}
