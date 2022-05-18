import type { TokenList } from '@uniswap/token-lists';

export function reconstructTokenListToLowerCase(tokenList: TokenList): TokenList {
	return { ...tokenList, tokens: tokenList.tokens.map((token) => ({ ...token, address: token.address.toLowerCase() })) };
}
