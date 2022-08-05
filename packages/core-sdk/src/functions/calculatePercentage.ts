import type { BigNumberish } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

export function calculatePercentage(
	full: BigNumberish,
	part: BigNumberish,
	defaultValue = 0,
	decimalsFull = 18,
	decimalsPart: number = decimalsFull
): number {
	const fullNumber = Number(formatUnits(full, decimalsFull));
	const partNumber = Number(formatUnits(part, decimalsPart));

	const result = (100 * partNumber) / fullNumber;
	return Number.isNaN(result) ? defaultValue : result;
}
