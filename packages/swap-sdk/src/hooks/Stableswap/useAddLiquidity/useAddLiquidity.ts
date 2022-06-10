import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import type { ContractReceipt, providers, Signer } from 'ethers';
import type { UseMutationResult } from 'react-query';
import type { CurveLikeGeneralPool } from '../../../types/contracts/stableswap';
import { StableSwap, STABLE_SWAP_FACTORY } from '../core';

export function useAddLiquidity(
	swapType: StableSwap,
	signer?: Signer | undefined,
	provider?: providers.Provider,
	swap?: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<CurveLikeGeneralPool['add_liquidity']>> {
	const swapContract = swap && provider ? STABLE_SWAP_FACTORY[swapType].connect(swap, provider) : undefined;

	const addLiquidity = useSmartContractTransaction<CurveLikeGeneralPool, 'add_liquidity'>(
		swapContract as unknown as CurveLikeGeneralPool,
		'add_liquidity',
		signer,
		{
			blockConfirmations: 2
		}
	);

	return addLiquidity;
}
