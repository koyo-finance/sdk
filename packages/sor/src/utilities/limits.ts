import type { SwapToken } from '../types';

export function calculateLimits(tokensIn: SwapToken[], tokensOut: SwapToken[], tokenAddresses: string[]): string[] {
	const limits: string[] = [];

	tokenAddresses.forEach((token, i) => {
		const tokenIn = tokensIn.find((swapToken) => token.toLowerCase() === swapToken.address.toLowerCase());
		const tokenOut = tokensOut.find((swapToken) => token.toLowerCase() === swapToken.address.toLowerCase());

		if (tokenIn) {
			limits[i] = tokenIn.amount.toString();
		} else if (tokenOut) {
			limits[i] = tokenOut.amount.mul(-1).toString();
		} else {
			limits[i] = '0';
		}
	});

	return limits;
}
