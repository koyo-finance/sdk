import { ChainId } from '../enums';
import * as aurora from './addresses/aurora';
import * as avalanche from './addresses/avalanche';
import * as boba from './addresses/boba';
import * as bobabeam from './addresses/bobabeam';
import * as bobaopera from './addresses/bobaopera';
import * as ethereum from './addresses/ethereum';
import * as fantom from './addresses/fantom';
import * as moonbeam from './addresses/moonbeam';
import * as moonriver from './addresses/moonriver';
import * as polygon from './addresses/polygon';

export * from './addresses/aurora';
export * from './addresses/avalanche';
export * from './addresses/boba';
export * from './addresses/bobabeam';
export * from './addresses/bobaopera';
export * from './addresses/ethereum';
export * from './addresses/fantom';
export * from './addresses/moonbeam';
export * from './addresses/moonriver';
export * from './addresses/polygon';

export const CHAIN_MULTICALL_ONE: { [C in ChainId]: string } = {
	[ChainId.ETHEREUM]: ethereum.ETHEREUM_MULTICALL_ONE_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_MULTICALL_ONE_ADDRESS,
	[ChainId.MOONBEAM]: moonbeam.MOONBEAM_MULTICALL_ONE_ADDRESS,
	[ChainId.BOBA]: boba.BOBA_MULTICALL_ONE_ADDRESS,
	[ChainId.BOBABEAM]: bobabeam.BOBABEAM_MULTICALL_ONE_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_MULTICALL_ONE_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_MULTICALL_ONE_ADDRESS,
	[ChainId.FANTOM]: fantom.FANTOM_MULTICALL_ONE_ADDRESS,
	[ChainId.BOBAOPERA]: bobaopera.BOBAOPERA_MULTICALL_ONE_ADDRESS,
	[ChainId.AVALANCHE]: avalanche.AVALANCHE_MULTICALL_ONE_ADDRESS
};
export const CHAIN_NATIVE_WRAPPED_ASSET: { [C in ChainId]: string } = {
	[ChainId.ETHEREUM]: ethereum.ETHEREUM_WETH_ADDRESS,
	[ChainId.MOONRIVER]: moonriver.MOONRIVER_WETH_ADDRESS,
	[ChainId.MOONBEAM]: moonbeam.MOONBEAM_WETH_ADDRESS,
	[ChainId.BOBA]: boba.BOBA_WETH_ADDRESS,
	[ChainId.BOBABEAM]: bobabeam.BOBABEAM_WETH_ADDRESS,
	[ChainId.AURORA]: aurora.AURORA_WETH_ADDRESS,
	[ChainId.POLYGON]: polygon.POLYGON_WETH_ADDRESS,
	[ChainId.FANTOM]: fantom.FANTOM_WETH_ADDRESS,
	[ChainId.BOBAOPERA]: bobaopera.BOBAOPERA_WETH_ADDRESS,
	[ChainId.AVALANCHE]: avalanche.AVALANCHE_WETH_ADDRESS
};
