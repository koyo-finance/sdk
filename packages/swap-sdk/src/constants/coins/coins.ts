import { ChainId } from '@koyofinance/core-sdk';
import { REFERENCE_ASSETS } from '../referenceAssets';

export const coins: ReadonlyArray<RawCoin> = [
	{
		id: 'boba:dai',
		coingeckoId: 'dai',
		chainId: ChainId.BOBA,
		type: REFERENCE_ASSETS.USD,
		name: 'Dai Stablecoin',
		symbol: 'dai',
		decimals: 18,
		address: '0xf74195Bb8a5cf652411867c5C2C5b8C2a402be35'
	},
	{
		id: 'boba:frax',
		coingeckoId: 'Frax',
		chainId: ChainId.BOBA,
		type: REFERENCE_ASSETS.USD,
		name: 'Frax',
		symbol: 'Frax',
		decimals: 18,
		address: '0x7562F525106F5d54E891e005867Bf489B5988CD9'
	},
	{
		id: 'boba:usdc',
		coingeckoId: 'usd-coin',
		chainId: ChainId.BOBA,
		type: REFERENCE_ASSETS.USD,
		name: 'USD Coin',
		symbol: 'usdc',
		decimals: 6,
		address: '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc'
	},
	{
		id: 'boba:usdt',
		coingeckoId: 'tether',
		chainId: ChainId.BOBA,
		type: REFERENCE_ASSETS.USD,
		name: 'Tether',
		symbol: 'usdt',
		decimals: 6,
		address: '0x5DE1677344D3Cb0D7D465c10b72A8f60699C062d'
	}
];

export interface RawCoin {
	id: string;
	coingeckoId: string;

	chainId: ChainId;

	type: REFERENCE_ASSETS;

	name: string;
	symbol: string;
	decimals: 18 | 6;

	address: string;
}
