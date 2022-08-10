import { ChainId } from '@koyofinance/core-sdk';
import type { SupportedChainsList } from '../types';

export const BOBA_MOMIJI_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/koyo-finance/momiji-boba';

export const CHAIN_MOMIJI_SUBGRAPH: { [C in SupportedChainsList]: string } = {
	[ChainId.BOBA]: BOBA_MOMIJI_SUBGRAPH_URL
};
