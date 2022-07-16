import { OldBigNumber, bnum } from '@balancer-labs/sor';

export const ONE = bnum(1);
export const INFINITY = bnum('Infinity');

export function scale(input: OldBigNumber, decimalPlaces: number): OldBigNumber {
	const scalePow = new OldBigNumber(decimalPlaces.toString());
	const scaleMul = new OldBigNumber(10).pow(scalePow);
	return input.times(scaleMul);
}
