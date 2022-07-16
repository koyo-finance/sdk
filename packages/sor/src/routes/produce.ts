import { hopDictionary, NewPath, PoolDictionary, ZERO } from '@balancer-labs/sor';
import { createPath } from '../utilities/routing';

export function producePaths(
	tokenIn: string,
	tokenOut: string,
	directPools: PoolDictionary,
	hopsIn: hopDictionary,
	hopsOut: hopDictionary,
	pools: PoolDictionary
): NewPath[] {
	const paths: NewPath[] = [];

	// Create direct paths
	for (const directPool of [...Object.values(directPools)]) {
		const path = createPath([tokenIn, tokenOut], [pools[directPool.id]]);
		paths.push(path);
	}

	for (const hopToken in hopsIn) {
		if (hopsOut[hopToken]) {
			let highestNormalizedLiquidityFirst = ZERO; // Aux variable to find pool with most liquidity for pair (tokenIn -> hopToken)
			let highestNormalizedLiquidityFirstPoolId: string | undefined; // Aux variable to find pool with most liquidity for pair (tokenIn -> hopToken)
			let highestNormalizedLiquiditySecond = ZERO; // Aux variable to find pool with most liquidity for pair (hopToken -> tokenOut)
			let highestNormalizedLiquiditySecondPoolId: string | undefined; // Aux variable to find pool with most liquidity for pair (hopToken -> tokenOut)

			for (const poolInId of [...hopsIn[hopToken]]) {
				const poolIn = pools[poolInId];
				const poolPairData = poolIn.parsePoolPairData(tokenIn, hopToken);
				const normalizedLiquidity = poolIn.getNormalizedLiquidity(poolPairData);
				// Cannot be strictly greater otherwise highestNormalizedLiquidityPoolId = 0 if hopTokens[i] balance is 0 in this pool.
				if (normalizedLiquidity.isGreaterThanOrEqualTo(highestNormalizedLiquidityFirst)) {
					highestNormalizedLiquidityFirst = normalizedLiquidity;
					highestNormalizedLiquidityFirstPoolId = poolIn.id;
				}
			}

			for (const poolOutId of [...hopsOut[hopToken]]) {
				const poolOut = pools[poolOutId];
				const poolPairData = poolOut.parsePoolPairData(hopToken, tokenOut);
				const normalizedLiquidity = poolOut.getNormalizedLiquidity(poolPairData);
				// Cannot be strictly greater otherwise highestNormalizedLiquidityPoolId = 0 if hopTokens[i] balance is 0 in this pool.
				if (normalizedLiquidity.isGreaterThanOrEqualTo(highestNormalizedLiquiditySecond)) {
					highestNormalizedLiquiditySecond = normalizedLiquidity;
					highestNormalizedLiquiditySecondPoolId = poolOut.id;
				}
			}

			if (highestNormalizedLiquidityFirstPoolId && highestNormalizedLiquiditySecondPoolId) {
				const path = createPath(
					[tokenIn, hopToken, tokenOut],
					[pools[highestNormalizedLiquidityFirstPoolId], pools[highestNormalizedLiquiditySecondPoolId]]
				);
				paths.push(path);
			}
		}
	}

	return paths;
}
