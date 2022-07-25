import type { PoolBase } from '@balancer-labs/sor';

export function getRaisingToken(pool: PoolBase, lbpRaisingTokens: string[], token: string): string | undefined {
	let theOtherToken: string | undefined;
	const { tokensList } = pool;

	if (tokensList.includes(token) && !lbpRaisingTokens.includes(token)) {
		for (let i = 0; i < 2; i++) {
			if (tokensList[i] === token) {
				theOtherToken = tokensList[1 - i];
			}
		}
	}

	return theOtherToken;
}
