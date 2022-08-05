import type { BigNumber } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';

export function toBigNumber(val: number, decimals = 18): BigNumber {
	return parseUnits(val.toString(), decimals);
}
