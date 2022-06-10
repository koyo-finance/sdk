import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import type { BigNumber, providers } from 'ethers';
import type { QueryObserverResult } from 'react-query';
import { CurveLikeGeneralPool__factory } from '../../../types';

export function useGetVirtualPrice(provider?: providers.Provider, swap?: string): QueryObserverResult<BigNumber> {
	return useSmartContractReadCall(CurveLikeGeneralPool__factory.connect(swap!, provider!), 'get_virtual_price', {
		enabled: Boolean(provider && swap)
	});
}
