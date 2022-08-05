import { ChainDisplayName, ChainHex, ChainId, ChainKey } from '../enums';
import type { BasicBlockExplorer } from '../types';

export const CHAIN_KEY: { [chainId in ChainId]: ChainKey } = {
	[ChainId.ETHEREUM]: ChainKey.ETHEREUM,
	[ChainId.MOONRIVER]: ChainKey.MOONRIVER,
	[ChainId.MOONBEAM]: ChainKey.MOONBEAM,
	[ChainId.BOBA]: ChainKey.BOBA,
	[ChainId.BOBABEAM]: ChainKey.BOBABEAM,
	[ChainId.AURORA]: ChainKey.AURORA,
	[ChainId.POLYGON]: ChainKey.POLYGON,
	[ChainId.FANTOM]: ChainKey.FANTOM,
	[ChainId.BOBAOPERA]: ChainKey.BOBAOPERA,
	[ChainId.AVALANCHE]: ChainKey.AVALANCHE
};
export const CHAIN_ID_KEY: { [chainKey in ChainKey]: ChainId } = Object.fromEntries(Object.entries(CHAIN_KEY).map((chain) => chain.reverse()));

export const CHAIN_DISPLAY_NAME: { [chainId in ChainId]: ChainDisplayName } = {
	[ChainId.ETHEREUM]: ChainDisplayName.ETHEREUM,
	[ChainId.MOONRIVER]: ChainDisplayName.MOONRIVER,
	[ChainId.MOONBEAM]: ChainDisplayName.MOONBEAM,
	[ChainId.BOBA]: ChainDisplayName.BOBA,
	[ChainId.BOBABEAM]: ChainDisplayName.BOBABEAM,
	[ChainId.AURORA]: ChainDisplayName.AURORA,
	[ChainId.POLYGON]: ChainDisplayName.POLYGON,
	[ChainId.FANTOM]: ChainDisplayName.FANTOM,
	[ChainId.BOBAOPERA]: ChainDisplayName.BOBAOPERA,
	[ChainId.AVALANCHE]: ChainDisplayName.AVALANCHE
};

export const CHAIN_HEX: { [chainId in ChainId]: ChainHex } = {
	[ChainId.ETHEREUM]: ChainHex.ETHEREUM,
	[ChainId.MOONRIVER]: ChainHex.MOONRIVER,
	[ChainId.MOONBEAM]: ChainHex.MOONBEAM,
	[ChainId.BOBA]: ChainHex.BOBA,
	[ChainId.BOBABEAM]: ChainHex.BOBABEAM,
	[ChainId.AURORA]: ChainHex.AURORA,
	[ChainId.POLYGON]: ChainHex.POLYGON,
	[ChainId.FANTOM]: ChainHex.FANTOM,
	[ChainId.BOBAOPERA]: ChainHex.BOBAOPERA,
	[ChainId.AVALANCHE]: ChainHex.AVALANCHE
};

export const CHAIN_EXPLORER_INFO: { [chainId in ChainId]: BasicBlockExplorer } = {
	[ChainId.ETHEREUM]: { url: 'https://etherscan.io/', name: 'Etherscan' },
	[ChainId.MOONRIVER]: { url: 'https://moonriver.moonscan.io/', name: 'Moonscan - Moonriver' },
	[ChainId.MOONBEAM]: { url: 'https://moonscan.io/', name: 'Moonscan' },
	[ChainId.BOBA]: { url: 'https://bobascan.com/', name: 'Bobascan' },
	[ChainId.BOBABEAM]: { url: '', name: 'BlockExplorer - BobaBeam' },
	[ChainId.AURORA]: { url: 'https://aurorascan.dev/', name: 'Aurorascan' },
	[ChainId.POLYGON]: { url: 'https://polygonscan.com/', name: 'Polygonscan' },
	[ChainId.FANTOM]: { url: 'https://ftmscan.com/', name: 'FTMScan' },
	[ChainId.BOBAOPERA]: { url: '', name: 'BlockExplorer - BobaOpera' },
	[ChainId.AVALANCHE]: { url: 'https://snowtrace.io/', name: 'Snowtrace' }
};
