import { isSameAddress } from '@koyofinance/core-sdk';
import type { BigNumber, providers } from 'ethers';
import { APPROVELESS_TOKEN_FILLS } from '../constants';
import { ERC20__factory } from '../types/contracts/util';

export async function getBalanceOf(owner: string, asset: string, provider: providers.Provider): Promise<BigNumber> {
	if (APPROVELESS_TOKEN_FILLS.some((atfAddr) => isSameAddress(asset, atfAddr))) return provider.getBalance(owner);

	const contract = ERC20__factory.connect(asset, provider);
	return contract.balanceOf(owner);
}
