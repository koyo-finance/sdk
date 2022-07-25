import type { BigNumber } from '@ethersproject/bignumber';

export interface SwapToken {
	address: string;
	amount: BigNumber;
}
