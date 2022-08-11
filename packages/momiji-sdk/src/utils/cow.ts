import { CowError, SupportedChainId, Token } from '@cowprotocol/cow-sdk';
import { SigningScheme } from '../enums';
import type { SchemaInfo } from '../types';

export const XDAI_SYMBOL = 'XDAI';

export const WRAPPED_NATIVE_TOKEN: Record<SupportedChainId, Token> = {
	[SupportedChainId.MAINNET]: new Token('WETH', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'),
	[SupportedChainId.RINKEBY]: new Token('WETH', '0xc778417E063141139Fce010982780140Aa0cD5Ab'),
	[SupportedChainId.GOERLI]: new Token('WETH', '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'),
	[SupportedChainId.GNOSIS_CHAIN]: new Token('WXDAI', '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d')
};

export const NATIVE: Record<SupportedChainId, string> = {
	[SupportedChainId.MAINNET]: 'ETH',
	[SupportedChainId.RINKEBY]: 'ETH',
	[SupportedChainId.GOERLI]: 'ETH',
	[SupportedChainId.GNOSIS_CHAIN]: XDAI_SYMBOL
};

export const mapSigningSchema: Map<SigningScheme, SchemaInfo> = new Map([
	[SigningScheme.EIP712, { libraryValue: 0, apiValue: 'eip712' }],
	[SigningScheme.ETHSIGN, { libraryValue: 1, apiValue: 'ethsign' }],
	[SigningScheme.EIP1271, { libraryValue: 2, apiValue: 'eip1271' }],
	[SigningScheme.PRESIGN, { libraryValue: 3, apiValue: 'presign' }]
]);

export function toErc20Address(tokenAddress: string, chainId: SupportedChainId): string {
	let checkedAddress = tokenAddress;

	if (tokenAddress === NATIVE[chainId]) {
		checkedAddress = WRAPPED_NATIVE_TOKEN[chainId].address;
	}

	return checkedAddress;
}

export function _getSigningSchemeInfo(ecdaSigningScheme: SigningScheme): SchemaInfo {
	const value = mapSigningSchema.get(ecdaSigningScheme);
	if (value === undefined) {
		throw new CowError(`Unknown schema ${ecdaSigningScheme}`);
	}

	return value;
}

export function getSigningSchemeApiValue(ecdaSigningScheme: SigningScheme): string {
	return _getSigningSchemeInfo(ecdaSigningScheme).apiValue;
}

export function getSigningSchemeLibValue(ecdaSigningScheme: SigningScheme): number {
	return _getSigningSchemeInfo(ecdaSigningScheme).libraryValue;
}
