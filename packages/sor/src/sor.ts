import { PoolDataService, SOR, TokenPriceService } from '@balancer-labs/sor';
import type { Provider } from '@ethersproject/abstract-provider';
import { RouteProposer } from './routes/proposer';
import type { KoyoSorConfig } from './types/sor';

export class KoyoSor extends SOR {
	public constructor(provider: Provider, config: KoyoSorConfig, poolDataService: PoolDataService, tokenPriceService: TokenPriceService) {
		super(provider, config, poolDataService, tokenPriceService);

		// @ts-expect-error We just need to overwrite this. Sorry Typescript.
		this.routeProposer = new RouteProposer(config);
	}
}
