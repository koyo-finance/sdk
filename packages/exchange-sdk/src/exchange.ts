import type { PoolDataService, TokenPriceService } from '@balancer-labs/sor';
import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import type { ChainId } from '@koyofinance/core-sdk';
import { KoyoSOR } from '@koyofinance/sor';
import { AggregateTokenPriceService } from './services/AggregateTokenPriceService';
import { CoingeckoTokenPriceService } from './services/CoingeckoTokenPriceService';
import { SubgraphPoolDataService } from './services/SubgraphPoolDataService';
import { SubgraphTokenPriceService } from './services/SubgraphTokenPriceService';

export interface KoyoExchangeSDKSorConfig {
	vault: string;
	wrappedNativeAsset: string;
	multi: string;
	subgraph: string;

	poolDataService?: PoolDataService;
	tokenPriceService?: TokenPriceService;
}

export interface KoyoExchangeSDKConfig {
	network: ChainId;
	rpcUrl: string;
	sor: KoyoExchangeSDKSorConfig;
}

export class Exchange {
	public readonly provider: Provider;

	public readonly poolService: PoolDataService;
	public readonly priceService: TokenPriceService;
	public readonly sor: KoyoSOR;

	public constructor(public readonly config: KoyoExchangeSDKConfig) {
		this.provider = new JsonRpcProvider(this.config.rpcUrl, this.config.network);

		this.poolService =
			this.config.sor.poolDataService ||
			new SubgraphPoolDataService({
				chainId: this.config.network,
				multiAddress: this.config.sor.multi,
				vaultAddress: this.config.sor.vault,
				subgraphUrl: this.config.sor.subgraph,
				onchain: true,
				provider: this.provider
			});

		this.priceService =
			this.config.sor.tokenPriceService ||
			new AggregateTokenPriceService([
				new SubgraphTokenPriceService(this.config.sor.subgraph, this.config.sor.wrappedNativeAsset),
				new CoingeckoTokenPriceService(this.config.network)
			]);

		this.sor = new KoyoSOR(
			this.provider,
			{
				chainId: this.config.network,
				vault: this.config.sor.vault,
				weth: this.config.sor.wrappedNativeAsset
			},
			this.poolService,
			this.priceService
		);
	}
}
