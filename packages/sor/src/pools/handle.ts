import { OldBigNumber, PoolBase, PoolPairBase, PoolTypes, SwapTypes, ZERO } from '@balancer-labs/sor';
import { INFINITY, scale } from '../utilities/oldBigNumber';

// TODO: Add cases for pairType = [BTP->token, token->BTP] and poolType = [weighted, stable]
export function getOutputAmountSwap(pool: PoolBase, poolPairData: PoolPairBase, swapType: SwapTypes, amount: OldBigNumber): OldBigNumber {
	// TODO: check if necessary to check if amount > limitAmount
	if (swapType === SwapTypes.SwapExactIn) {
		if (poolPairData.poolType !== PoolTypes.Linear && poolPairData.balanceIn.isZero()) {
			return ZERO;
		}

		return pool._exactTokenInForTokenOut(poolPairData, amount);
	}

	if (poolPairData.balanceOut.isZero()) {
		return ZERO;
	} else if (scale(amount, poolPairData.decimalsOut).gte(poolPairData.balanceOut.toString())) {
		return INFINITY;
	}

	return pool._tokenInForExactTokenOut(poolPairData, amount);
}
