import { ChainId } from '@koyofinance/core-sdk';
import type { SupportedChainsList } from '../types';
import * as boba from './addresses/boba';

export * from './addresses/boba';

export const CHAIN_KOYO_GP_V2_SETTLEMENT_ADDRESS: { [C in SupportedChainsList]: string } = {
	[ChainId.BOBA]: boba.BOBA_KOYO_GP_V2_SETTLEMENT_ADDRESS
};
