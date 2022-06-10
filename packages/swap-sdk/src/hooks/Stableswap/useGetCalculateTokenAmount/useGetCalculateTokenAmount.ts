import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import type { BigNumber, BigNumberish, providers } from 'ethers';
import type { QueryObserverResult } from 'react-query';
import { StableSwap, STABLE_SWAP_FACTORY } from '../core';

export function useGetCalculateTokenAmount(
	swapType: StableSwap,
	amounts: BigNumberish[] | null | undefined,
	isDeposit: boolean | null | undefined,
	provider?: providers.Provider,
	swap?: string
): QueryObserverResult<BigNumber> {
	const swapContract = swap && provider ? STABLE_SWAP_FACTORY[swapType].connect(swap, provider) : undefined;

	return useSmartContractReadCall(swapContract, 'calc_token_amount', {
		// @ts-expect-error This function can be used more fluidly.
		callArgs: [amounts as BigNumberish[], isDeposit as boolean],
		enabled: Boolean(amounts && amounts.length !== 0 && swap && swapContract && provider)
	});
}
