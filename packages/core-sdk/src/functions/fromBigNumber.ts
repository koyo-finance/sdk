import type { BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export function fromBigNumber(val: BigNumberish, decimals = 18): number {
	return Number(formatUnits(val, decimals));
}
