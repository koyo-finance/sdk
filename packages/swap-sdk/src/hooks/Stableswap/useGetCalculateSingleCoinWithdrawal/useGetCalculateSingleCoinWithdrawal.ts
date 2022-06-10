import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import type { BigNumber, BigNumberish, providers } from 'ethers';
import type { QueryObserverResult } from 'react-query';
import { CurveLikeGeneralPool__factory } from '../../../types';

export function useGetCalculateSingleCoinWithdrawal(
	i: BigNumberish | null | undefined,
	amount: BigNumberish | null | undefined,
	provider?: providers.Provider,
	swap?: string
): QueryObserverResult<BigNumber> {
	const iValid = i !== undefined && i !== null && i !== -1;

	return useSmartContractReadCall(CurveLikeGeneralPool__factory.connect(swap!, provider!), 'calc_withdraw_one_coin', {
		callArgs: [amount as BigNumberish, i as BigNumberish],
		enabled: Boolean(iValid && amount && provider && swap)
	});
}
