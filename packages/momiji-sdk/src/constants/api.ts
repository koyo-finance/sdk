import { ChainId } from '@koyofinance/core-sdk';
import type { SupportedChainsList } from '../types';

export const BOBA_MOMIJI_ORDERBOOK_API = 'https://momiji.koyo.finance/boba/api';

export const CHAIN_MOMIJI_ORDERBOOK_API: { [C in SupportedChainsList]: string } = {
	[ChainId.BOBA]: BOBA_MOMIJI_ORDERBOOK_API
};
