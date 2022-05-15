import type { BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

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
