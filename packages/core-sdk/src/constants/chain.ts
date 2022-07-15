import { ChainHex, ChainId, ChainKey } from '../enums';

export const CHAIN_KEY: { [chainId in ChainId]: ChainKey } = {
	[ChainId.ETHEREUM]: ChainKey.ETHEREUM,
	[ChainId.MOONRIVER]: ChainKey.MOONRIVER,
	[ChainId.MOONBEAM]: ChainKey.MOONBEAM,
	[ChainId.RINKEBY]: ChainKey.RINKEBY,
	[ChainId.MOONBASE]: ChainKey.MOONBASE,
	[ChainId.BOBA]: ChainKey.BOBA,
	[ChainId.BOBABEAM]: ChainKey.BOBABEAM,
	[ChainId.BOBA_RINKEBY]: ChainKey.BOBA_RINKEBY,
	[ChainId.BOBABASE]: ChainKey.BOBABASE,
	[ChainId.AURORA]: ChainKey.AURORA,
	[ChainId.POLYGON]: ChainKey.POLYGON,
	[ChainId.FANTOM]: ChainKey.FANTOM,
	[ChainId.BOBAOPERA]: ChainKey.BOBAOPERA,
	[ChainId.AVALANCHE]: ChainKey.AVALANCHE
};

export const CHAIN_ID_KEY: { [chainKey in ChainKey]: ChainId } = Object.fromEntries(Object.entries(CHAIN_KEY).map((chain) => chain.reverse()));

export const CHAIN_HEX: { [chainId in ChainId]: ChainHex } = {
	[ChainId.ETHEREUM]: ChainHex.ETHEREUM,
	[ChainId.MOONRIVER]: ChainHex.MOONRIVER,
	[ChainId.MOONBEAM]: ChainHex.MOONBEAM,
	[ChainId.RINKEBY]: ChainHex.RINKEBY,
	[ChainId.MOONBASE]: ChainHex.MOONBASE,
	[ChainId.BOBA]: ChainHex.BOBA,
	[ChainId.BOBABEAM]: ChainHex.BOBABEAM,
	[ChainId.BOBA_RINKEBY]: ChainHex.BOBA_RINKEBY,
	[ChainId.BOBABASE]: ChainHex.BOBABASE,
	[ChainId.AURORA]: ChainHex.AURORA,
	[ChainId.POLYGON]: ChainHex.POLYGON,
	[ChainId.FANTOM]: ChainHex.FANTOM,
	[ChainId.BOBAOPERA]: ChainHex.BOBAOPERA,
	[ChainId.AVALANCHE]: ChainHex.AVALANCHE
};

export const CHAIN_EXPLORER: { [chainId in ChainId]: BlockExplorer } = {
	[ChainId.ETHEREUM]: { url: 'https://etherscan.io/', name: 'Etherscan' },
	[ChainId.MOONRIVER]: { url: 'https://moonriver.moonscan.io/', name: 'Moonscan - Moonriver' },
	[ChainId.MOONBEAM]: { url: 'https://moonscan.io/', name: 'Moonscan' },
	[ChainId.RINKEBY]: { url: 'https://rinkeby.etherscan.io/', name: 'Etherscan - Rinkeby' },
	[ChainId.MOONBASE]: { url: 'https://moonbase.moonscan.io/', name: 'Moonscan - Moonbase' },
	[ChainId.BOBA]: { url: 'https://bobascan.com/', name: 'Bobascan' },
	[ChainId.BOBABEAM]: { url: '', name: 'BlockExplorer - BobaBeam' },
	[ChainId.BOBA_RINKEBY]: { url: 'https://testnet.bobascan.com/', name: 'Bobascan - Boba Rinkeby' },
	[ChainId.BOBABASE]: { url: 'https://blockexplorer.bobabase.boba.network/', name: 'BlockExplorer - BobaBase' },
	[ChainId.AURORA]: { url: 'https://aurorascan.dev/', name: 'Aurorascan' },
	[ChainId.POLYGON]: { url: 'https://polygonscan.com/', name: 'Polygonscan' },
	[ChainId.FANTOM]: { url: 'https://ftmscan.com/', name: 'FTMScan' },
	[ChainId.BOBAOPERA]: { url: '', name: 'BlockExplorer - BobaOpera' },
	[ChainId.AVALANCHE]: { url: 'https://snowtrace.io/', name: 'Snowtrace' }
};

export interface BlockExplorer {
	url: string;
	name?: string;
}
