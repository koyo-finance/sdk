import { PoolType, PoolTypeKey } from '../enums';

export const POOL_TYPE_KEY: { [poolType in PoolType]: PoolTypeKey } = {
	[PoolType.StableSwap]: PoolTypeKey.StableSwap
};
