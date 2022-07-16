import { NewPath, parseToPoolsDict, PoolDictionary, SubgraphPoolBase, SwapOptions, SwapTypes } from '@balancer-labs/sor';
import type { RouteProposerService } from '../types/proposal';
import type { KoyoSorConfig } from '../types/sor';
import { getBoostedPaths } from './boosted';
import { filterPoolsOfInterest } from './filter';
import { calculatePathLimits } from './pathLimits';
import { producePaths } from './produce';

export class RouteProposer implements RouteProposerService {
	private readonly cache: Record<string, { paths: NewPath[] }> = {};

	public constructor(private readonly config: KoyoSorConfig) {}

	/**
	 * Given a list of pools and a desired input/output, returns a set of possible paths to route through
	 */
	public getCandidatePaths(tokenIn: string, tokenOut: string, swapType: SwapTypes, pools: SubgraphPoolBase[], swapOptions: SwapOptions): NewPath[] {
		tokenIn = tokenIn.toLowerCase();
		tokenOut = tokenOut.toLowerCase();
		if (pools.length === 0) return [];

		// If token pair has been processed before that info can be reused to speed up execution
		const cache = this.cache[`${tokenIn}${tokenOut}${swapType}${swapOptions.timestamp}`];

		// forceRefresh can be set to force fresh processing of paths/prices
		if (!swapOptions.forceRefresh && Boolean(cache)) {
			// Using pre-processed data from cache
			return cache.paths;
		}

		const poolsAllDict = parseToPoolsDict(pools, swapOptions.timestamp);
		const [directPools, hopsIn, hopsOut] = filterPoolsOfInterest(poolsAllDict, tokenIn, tokenOut, swapOptions.maxPools);
		const pathData = producePaths(tokenIn, tokenOut, directPools, hopsIn, hopsOut, poolsAllDict);
		const boostedPaths = getBoostedPaths(tokenIn, tokenOut, poolsAllDict, this.config);

		const combinedPathData = pathData.concat(...boostedPaths);
		const [paths] = calculatePathLimits(combinedPathData, swapType);

		this.cache[`${tokenIn}${tokenOut}${swapType}${swapOptions.timestamp}`] = {
			paths
		};
		return paths;
	}

	/**
	 * Given a pool dictionary and a desired input/output, returns a set of possible paths to route through.
	 * @param {string} tokenIn - Address of tokenIn
	 * @param {string} tokenOut - Address of tokenOut
	 * @param {SwapTypes} swapType - SwapExactIn where the amount of tokens in (sent to the Pool) is known or SwapExactOut where the amount of tokens out (received from the Pool) is known.
	 * @param {PoolDictionary} poolsAllDict - Dictionary of pools.
	 * @param {number }maxPools - Maximum number of pools to hop through.
	 * @returns {NewPath[]} Array of possible paths sorted by liquidity.
	 */
	public getCandidatePathsFromDict(
		tokenIn: string,
		tokenOut: string,
		swapType: SwapTypes,
		poolsAllDict: PoolDictionary,
		maxPools: number
	): NewPath[] {
		tokenIn = tokenIn.toLowerCase();
		tokenOut = tokenOut.toLowerCase();
		if (Object.keys(poolsAllDict).length === 0) return [];

		const [directPools, hopsIn, hopsOut] = filterPoolsOfInterest(poolsAllDict, tokenIn, tokenOut, maxPools);
		const pathData = producePaths(tokenIn, tokenOut, directPools, hopsIn, hopsOut, poolsAllDict);
		const boostedPaths = getBoostedPaths(tokenIn, tokenOut, poolsAllDict, this.config);

		const combinedPathData = pathData.concat(...boostedPaths);
		const [paths] = calculatePathLimits(combinedPathData, swapType);
		return paths;
	}
}
