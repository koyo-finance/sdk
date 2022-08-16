import { BOBA_WETH_ADDRESS, ChainId } from '@koyofinance/core-sdk';
import type { SupportedChainsList } from '../types';

export class Token {
	public constructor(public symbol: string, public address: string) {}
}

export const WRAPPED_NATIVE_TOKEN: Record<SupportedChainsList, Token> = {
	[ChainId.BOBA]: new Token('WETH', BOBA_WETH_ADDRESS)
};

export const NATIVE: Record<SupportedChainsList, string> = {
	[ChainId.BOBA]: 'ETH'
};

export function toErc20Address(tokenAddress: string, chainId: SupportedChainsList): string {
	let checkedAddress = tokenAddress;

	if (tokenAddress === NATIVE[chainId]) {
		checkedAddress = WRAPPED_NATIVE_TOKEN[chainId].address;
	}

	return checkedAddress;
}
