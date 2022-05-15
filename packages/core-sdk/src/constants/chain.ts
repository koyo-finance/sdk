import { ChainHex, ChainId, ChainKey } from '../enums';

export const CHAIN_KEY: { [chainId in ChainId]: ChainKey } = {
	[ChainId.ETHEREUM]: ChainKey.ETHEREUM,
	[ChainId.MOONBEAM]: ChainKey.MOONBEAM,
	[ChainId.RINKEBY]: ChainKey.RINKEBY,
	[ChainId.MOONBASE]: ChainKey.MOONBASE,
	[ChainId.BOBA]: ChainKey.BOBA,
	[ChainId.BOBABEAM]: ChainKey.BOBABEAM,
	[ChainId.BOBA_RINKEBY]: ChainKey.BOBA_RINKEBY,
	[ChainId.BOBABASE]: ChainKey.BOBABASE
};

export const CHAIN_HEX: { [chainId in ChainId]: ChainHex } = {
	[ChainId.ETHEREUM]: ChainHex.ETHEREUM,
	[ChainId.MOONBEAM]: ChainHex.MOONBEAM,
	[ChainId.RINKEBY]: ChainHex.RINKEBY,
	[ChainId.MOONBASE]: ChainHex.MOONBASE,
	[ChainId.BOBA]: ChainHex.BOBA,
	[ChainId.BOBABEAM]: ChainHex.BOBABEAM,
	[ChainId.BOBA_RINKEBY]: ChainHex.BOBA_RINKEBY,
	[ChainId.BOBABASE]: ChainHex.BOBABASE
};
