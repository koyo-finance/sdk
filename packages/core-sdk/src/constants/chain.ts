import { ChainId, ChainKey } from '../enums';

export const CHAIN_KEY: { [chainId: number]: ChainKey } = {
	[ChainId.ETHEREUM]: ChainKey.ETHEREUM,
	[ChainId.MOONBEAM]: ChainKey.MOONBEAM,
	[ChainId.RINKEBY]: ChainKey.RINKEBY,
	[ChainId.MOONBASE]: ChainKey.MOONBASE,
	[ChainId.BOBA]: ChainKey.BOBA,
	[ChainId.BOBABEAM]: ChainKey.BOBABEAM,
	[ChainId.BOBA_RINKEBY]: ChainKey.BOBA_RINKEBY,
	[ChainId.BOBABASE]: ChainKey.BOBABASE
};
