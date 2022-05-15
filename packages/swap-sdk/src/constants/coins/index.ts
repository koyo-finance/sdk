import type { ChainId } from '@koyofinance/core-sdk';
import { FIAT_ASSET_TYPES, REFERENCE_ASSETS } from '../referenceAssets';
import { coins, RawCoin } from './coins';

export * from './coins';

export class Coin {
	public id: string;

	public name: string;
	public symbol: string;
	public decimals: 18 | 6 = 18;

	public coingeckoId: string;

	public chainId: ChainId;

	public type: REFERENCE_ASSETS;

	public address: string;

	public readonly rawCoin: RawCoin;

	public constructor(coin: RawCoin) {
		this.id = coin.id;

		this.name = coin.name;
		this.symbol = coin.symbol;
		this.decimals = coin.decimals;

		this.coingeckoId = coin.coingeckoId;

		this.chainId = coin.chainId;

		this.type = coin.type;

		this.address = coin.address;

		this.rawCoin = coin;
	}

	public isFiat() {
		return FIAT_ASSET_TYPES.includes(this.type);
	}

	public toJSON() {
		return this.rawCoin;
	}
}

export const augmentedCoins = Object.fromEntries(coins.map((coin) => [coin.id, new Coin(coin)]));
