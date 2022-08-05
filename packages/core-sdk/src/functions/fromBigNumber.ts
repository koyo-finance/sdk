import type { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

export function fromBigNumber(val: BigNumberish, decimals = 18): number {
	return Number(formatUnits(val, decimals));
}
