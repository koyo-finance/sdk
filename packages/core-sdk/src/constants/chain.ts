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

export const CHAIN_EXPLORER: { [chainId in ChainId]: BlockExplorer } = {
	[ChainId.ETHEREUM]: { url: 'https://etherscan.io/', name: 'Etherscan' },
	[ChainId.MOONBEAM]: { url: 'https://moonscan.io/', name: 'Moonscan' },
	[ChainId.RINKEBY]: { url: 'https://rinkeby.etherscan.io/', name: 'Etherscan - Rinkeby' },
	[ChainId.MOONBASE]: { url: 'https://moonbase.moonscan.io/', name: 'Moonscan - Moonbase' },
	[ChainId.BOBA]: { url: 'https://blockexplorer.boba.network/', name: 'BlockExplorer - Boba' },
	[ChainId.BOBABEAM]: { url: '', name: 'BlockExplorer - BobaBeam' },
	[ChainId.BOBA_RINKEBY]: { url: 'https://blockexplorer.rinkeby.boba.network/', name: 'BlockExplorer - Boba Rinkeby' },
	[ChainId.BOBABASE]: { url: 'https://blockexplorer.bobabase.boba.network/', name: 'BlockExplorer - BobaBase' }
};

export interface BlockExplorer {
	url: string;
	name?: string;
}
