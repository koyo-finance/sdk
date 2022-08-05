import { MaxUint256 } from '@ethersproject/constants';
import { isSameAddress } from '@koyofinance/core-sdk';
import type { providers } from 'ethers';
import { APPROVELESS_TOKEN_FILLS } from '../constants';
import { ERC20__factory } from '../types/contracts/util/factories/ERC20__factory';

export async function getApprovedAssetAmount(owner: string, asset: string, operator: string, provider: providers.Provider) {
	if (APPROVELESS_TOKEN_FILLS.some((atfAddr) => isSameAddress(asset, atfAddr))) return MaxUint256;

	const contract = ERC20__factory.connect(asset, provider);
	return contract.allowance(owner, operator);
}
