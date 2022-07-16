import type { hopDictionary, PoolDictionary } from '@balancer-labs/sor';

export function filterPoolsOfInterest(
	allPools: PoolDictionary,
	tokenIn: string,
	tokenOut: string,
	maxPools: number
): [PoolDictionary, hopDictionary, hopDictionary] {
	const directPools: PoolDictionary = {};
	const hopsIn: hopDictionary = {};
	const hopsOut: hopDictionary = {};

	Object.keys(allPools).forEach((id) => {
		const pool = allPools[id];
		const tokenListSet = new Set(pool.tokensList);
		const containsTokenIn = tokenListSet.has(tokenIn.toLowerCase());
		const containsTokenOut = tokenListSet.has(tokenOut.toLowerCase());

		// This is a direct pool as has both tokenIn and tokenOut
		if (containsTokenIn && containsTokenOut) {
			directPools[pool.id] = pool;
			return;
		}

		if (maxPools > 1) {
			if (containsTokenIn && !containsTokenOut) {
				for (const hopToken of tokenListSet) {
					if (!hopsIn[hopToken]) hopsIn[hopToken] = new Set([]);
					hopsIn[hopToken].add(pool.id);
				}
			} else if (!containsTokenIn && containsTokenOut) {
				for (const hopToken of [...tokenListSet]) {
					if (!hopsOut[hopToken]) hopsOut[hopToken] = new Set([]);
					hopsOut[hopToken].add(pool.id);
				}
			}
		}
	});

	return [directPools, hopsIn, hopsOut];
}
