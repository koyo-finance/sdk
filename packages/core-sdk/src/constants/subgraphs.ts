import { ChainId } from '../enums';

export const BOBA_BLOCKS_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/koyo-finance/boba-blocks';
export const AURORA_BLOCKS_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/koyo-finance/aurora-blocks';
export const MOONRIVER_BLOCKS_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/koyo-finance/moonriver-blocks';
export const POLYGON_BLOCKS_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/koyo-finance/matic-blocks';

export const CHAIN_BLOCKS_SUBGRAPH: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: BOBA_BLOCKS_SUBGRAPH_URL,
	[ChainId.AURORA]: AURORA_BLOCKS_SUBGRAPH_URL,
	[ChainId.MOONRIVER]: MOONRIVER_BLOCKS_SUBGRAPH_URL,
	[ChainId.POLYGON]: POLYGON_BLOCKS_SUBGRAPH_URL
};
