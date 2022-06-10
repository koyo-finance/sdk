import { CurveLike3Pool, CurveLike3Pool__factory, CurveLike4Pool, CurveLike4Pool__factory } from '../../types/contracts/stableswap';

export enum StableSwap {
	ThreePool = '3pool',
	FourPool = '4pool'
}

export type StableSwapContract = CurveLike3Pool | CurveLike4Pool;
export type StableSwapContractFactory = CurveLike3Pool__factory | CurveLike4Pool__factory;

export interface StableSwapContractMapping {
	[StableSwap.ThreePool]: CurveLike3Pool;
	[StableSwap.FourPool]: CurveLike4Pool;
}

export const STABLE_SWAP_FACTORY = {
	[StableSwap.ThreePool]: CurveLike3Pool__factory,
	[StableSwap.FourPool]: CurveLike4Pool__factory
};
