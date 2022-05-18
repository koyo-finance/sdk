import type { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

export function toBigNumber(val: number, decimals = 18): BigNumber {
	return parseUnits(val.toString(), decimals);
}
