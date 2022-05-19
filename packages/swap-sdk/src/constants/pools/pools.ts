import { ChainId } from '@koyofinance/core-sdk';
import { augmentedCoins, Coin } from '../coins';

export const pools: ReadonlyArray<Pool> = [
	{
		id: '3pool',
		name: '3pool',
		chainId: ChainId.BOBA,
		lpTokenInfo: {
			name: 'Koyo.finance FRAX/USDC/USDT',
			symbol: '3Koyo'
		},
		assets: 'FRAX+USDC+USDT',
		coins: [
			augmentedCoins['boba:frax'], //
			augmentedCoins['boba:usdc'],
			augmentedCoins['boba:usdt']
		],
		addresses: {
			swap: '0x0613adbd846cb73e65aa474b785f52697af04c0b',
			lpToken: '0xea1e627c12df4e054d61fd408ff7186353ac6ca1'
		}
	},
	{
		id: '4pool',
		name: '4pool',
		chainId: ChainId.BOBA,
		lpTokenInfo: {
			name: 'Koyo.finance FRAX/DAI/USDC/USDT',
			symbol: '4Koyo'
		},
		assets: 'FRAX+DAI+USDC+USDT',
		coins: [
			augmentedCoins['boba:frax'], //
			augmentedCoins['boba:dai'],
			augmentedCoins['boba:usdc'],
			augmentedCoins['boba:usdt']
		],
		addresses: {
			swap: '0x9f0a572be1fcfe96e94c0a730c5f4bc2993fe3f6',
			lpToken: '0xdab3fc342a242add09504bea790f9b026aa1e709'
		}
	}
];

export interface PoolLPTokenInfo {
	name: string;
	symbol: string;
}

export interface PoolAddresses {
	swap: string;
	lpToken: string;
}

export interface Pool {
	id: string;
	name: string;
	chainId: ChainId;

	lpTokenInfo: PoolLPTokenInfo;

	assets: string;
	coins: Coin[];

	addresses: PoolAddresses;
}
