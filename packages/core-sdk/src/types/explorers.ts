import type { ExplorerTarget } from '../enums';

export interface BasicBlockExplorer {
	url: string;
	name?: string;
}

export interface ExplorerDefinition {
	[ExplorerTarget.TRANSACTION]: (txHash: string) => string;
	[ExplorerTarget.TOKEN]: (tokenAddress: string) => string;
	[ExplorerTarget.BLOCK]: (blockNumber: string) => string;
	[ExplorerTarget.ADDRESS]: (address: string) => string;
	fallback?: (data: string) => string;
}
