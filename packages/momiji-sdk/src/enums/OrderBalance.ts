/**
 * Order balance configuration.
 */
export enum OrderBalance {
	/**
	 * Use ERC20 token balances.
	 */
	ERC20 = 'erc20',
	/**
	 * Use Balancer or Koyo Vault external balances.
	 *
	 * This can only be specified specified for the sell balance and allows orders
	 * to re-use Vault ERC20 allowances. When specified for the buy balance, it
	 * will be treated as {@link OrderBalance.ERC20}.
	 */
	EXTERNAL = 'external',
	/**
	 * Use Balancer or Koyo Vault internal balances.
	 */
	INTERNAL = 'internal'
}
