import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import type { ContractReceipt, providers, Signer } from 'ethers';
import type { UseMutationResult } from 'react-query';
import type { CurveLikeGeneralPool } from '../../../types';
import { StableSwap, STABLE_SWAP_FACTORY } from '../core';

export function useRemoveLiquidityImbalance(
	swapType: StableSwap,
	signer?: Signer | undefined,
	provider?: providers.Provider,
	swap?: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<CurveLikeGeneralPool['remove_liquidity_imbalance']>> {
	const swapContract = swap && provider ? STABLE_SWAP_FACTORY[swapType].connect(swap, provider) : undefined;

	const removeLiquidityImbalance = useSmartContractTransaction<CurveLikeGeneralPool, 'remove_liquidity_imbalance'>(
		swapContract as unknown as CurveLikeGeneralPool,
		'remove_liquidity_imbalance',
		signer,
		{
			blockConfirmations: 2
		}
	);

	return removeLiquidityImbalance;
}
