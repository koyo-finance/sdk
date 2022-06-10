import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import type { BigNumber, BigNumberish, providers } from 'ethers';
import type { QueryObserverResult } from 'react-query';
import { CurveLikeGeneralPool__factory } from '../../../types';

export function useGetDY(
	i: BigNumberish | null | undefined,
	j: BigNumberish | null | undefined,
	dx: BigNumberish | null | undefined,
	provider?: providers.Provider,
	swap?: string
): QueryObserverResult<BigNumber> {
	const iValid = i !== undefined && i !== null && i !== -1;
	const jValid = j !== undefined && j !== null && j !== -1;

	return useSmartContractReadCall(CurveLikeGeneralPool__factory.connect(swap!, provider!), 'get_dy', {
		callArgs: [i as BigNumberish, j as BigNumberish, dx as BigNumberish],
		enabled: Boolean(iValid && jValid && dx && provider && swap)
	});
}
