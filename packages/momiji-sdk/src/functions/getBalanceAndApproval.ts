import { MaxUint256 } from '@ethersproject/constants';
import { isSameAddress } from '@koyofinance/core-sdk';
import type { BigNumber, providers } from 'ethers';
import { APPROVELESS_TOKEN_FILLS } from '../constants';
import { getApprovedAssetAmount } from './getApprovedAssetAmount';
import { getBalanceOf } from './getBalanceOf';

export interface BalanceAndApproval {
	balance: BigNumber;
	approvedAmount: BigNumber;
}

export async function getBalanceAndApproval(
	owner: string,
	asset: string,
	operator: string,
	provider: providers.Provider
): Promise<BalanceAndApproval> {
	const approvedAmountPromise = APPROVELESS_TOKEN_FILLS.some((atfAddr) => isSameAddress(asset, atfAddr))
		? MaxUint256
		: getApprovedAssetAmount(owner, asset, operator, provider);

	return {
		balance: await getBalanceOf(owner, asset, provider),
		approvedAmount: await approvedAmountPromise
	};
}
