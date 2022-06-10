import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import type { ContractReceipt, providers, Signer } from 'ethers';
import type { UseMutationResult } from 'react-query';
import type { CurveLikeGeneralPool } from '../../../types';
import { StableSwap, STABLE_SWAP_FACTORY } from '../core';

export function useExchange(
	swapType: StableSwap,
	signer?: Signer | undefined,
	provider?: providers.Provider,
	swap?: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<CurveLikeGeneralPool['exchange']>> {
	const swapContract = swap && provider ? STABLE_SWAP_FACTORY[swapType].connect(swap, provider) : undefined;

	const exchange = useSmartContractTransaction<CurveLikeGeneralPool, 'exchange'>(
		swapContract as unknown as CurveLikeGeneralPool,
		'exchange',
		signer,
		{
			blockConfirmations: 2
		}
	);
	return exchange;
}
