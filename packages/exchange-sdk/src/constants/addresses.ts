import { ChainId } from '@koyofinance/core-sdk';
import * as aurora from './addresses/aurora';
import * as boba from './addresses/boba';
import * as moonriver from './addresses/moonriver';
import * as polygon from './addresses/polygon';

export * from './addresses/aurora';
export * from './addresses/boba';
export * from './addresses/moonriver';
export * from './addresses/polygon';

export const CHAIN_MULTICALL_ONE: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: boba.BOBA_MULTICALL_ONE_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_MULTICALL_ONE_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_MULTICALL_ONE_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_MULTICALL_ONE_ADDRESS
};
export const CHAIN_NATIVE_WRAPPED_ASSET: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: boba.BOBA_WETH_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_WETH_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_WETH_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_WETH_ADDRESS
};

export const CHAIN_VAULT: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: boba.BOBA_VAULT_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_VAULT_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_VAULT_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_VAULT_ADDRESS
};
export const CHAIN_VAULT_HELPERS: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: boba.BOBA_VAULT_HELPER_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_VAULT_HELPER_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_VAULT_HELPER_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_VAULT_HELPER_ADDRESS
};
export const CHAIN_ORACLE_WEIGHTED_POOL_FACTRORY: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: boba.BOBA_ORACLE_WEIGHTED_POOL_FACTORY_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_ORACLE_WEIGHTED_POOL_FACTORY_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_ORACLE_WEIGHTED_POOL_FACTORY_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_ORACLE_WEIGHTED_POOL_FACTORY_ADDRESS
};
export const CHAIN_WEIGHTED_POOL_FACTORY: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: boba.BOBA_WEIGHTED_POOL_FACTORY_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_WEIGHTED_POOL_FACTORY_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_WEIGHTED_POOL_FACTORY_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_WEIGHTED_POOL_FACTORY_ADDRESS
};
export const CHAIN_STABLE_POOL_FACTORY: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: boba.BOBA_STABLE_POOL_FACTORY_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_STABLE_POOL_FACTORY_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_STABLE_POOL_FACTORY_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_STABLE_POOL_FACTORY_ADDRESS
};
