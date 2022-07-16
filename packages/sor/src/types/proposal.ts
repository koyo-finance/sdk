import type { NewPath, PoolDictionary, SubgraphPoolBase, SwapOptions, SwapTypes } from '@balancer-labs/sor';

export interface RouteProposerService {
	getCandidatePaths(tokenIn: string, tokenOut: string, swapType: SwapTypes, pools: SubgraphPoolBase[], swapOptions: SwapOptions): NewPath[];
	getCandidatePathsFromDict(tokenIn: string, tokenOut: string, swapType: SwapTypes, poolsAllDict: PoolDictionary, maxPools: number): NewPath[];
}
