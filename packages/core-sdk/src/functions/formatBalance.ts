import type { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

export function formatBalance(
	val: BigNumberish,
	options: Intl.NumberFormatOptions = {
		maximumFractionDigits: 5,
		minimumFractionDigits: 2
	},
	decimals = 18
): string {
	return Number(formatUnits(val, decimals)).toLocaleString('fullwide', options);
}
