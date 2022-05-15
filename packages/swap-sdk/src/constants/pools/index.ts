import { REFERENCE_ASSETS } from '../referenceAssets';
import { Pool, pools } from './pools';

export * from './pools';

export const augmentedPools: ReadonlyArray<AugmentedPool> = pools //
	.map((pool) => ({
		referenceAsset: REFERENCE_ASSETS.USD, //
		...pool,
		coingeckoInfo: { referenceAssetId: 'dollar' }
	}));
export const poolIds = augmentedPools.map(({ id }) => id);

export function getPoolById(id: string) {
	return augmentedPools.find((pool) => id === pool.id);
}

export function findPoolForCoinsIds(coinIdA: string, coinIdB: string) {
	return augmentedPools.find(({ coins }) => coins.some(({ id }) => id === coinIdA) && coins.some(({ id }) => id === coinIdB));
}

export function findPoolForSwapAddress(swapAddress: string) {
	const lcSwapAddress = swapAddress.toLowerCase();
	return augmentedPools.find(({ addresses }) => addresses.swap.toLowerCase() === lcSwapAddress);
}

export interface PoolCoingeckoInfo {
	referenceAssetId: string;
}

export interface AugmentedPool extends Pool {
	referenceAsset: REFERENCE_ASSETS;
	coingeckoInfo: PoolCoingeckoInfo;
}
