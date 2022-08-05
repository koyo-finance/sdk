import type { BigNumberish, BytesLike } from 'ethers';
import type { OrderBalance, OrderKind } from '../enums';

/**
 * A timestamp value.
 */
export type Timestamp = number | Date;

/**
 * A hash-like app data value.
 */
export type HashLike = BytesLike | number;

/**
 * Gnosis Protocol v2 order data.
 */
export interface Order {
	/**
	 * Sell token address.
	 */
	sellToken: string;
	/**
	 * Buy token address.
	 */
	buyToken: string;
	/**
	 * An optional address to receive the proceeds of the trade instead of the
	 * owner (i.e. the order signer).
	 */
	receiver?: string;
	/**
	 * The order sell amount.
	 *
	 * For fill or kill sell orders, this amount represents the exact sell amount
	 * that will be executed in the trade. For fill or kill buy orders, this
	 * amount represents the maximum sell amount that can be executed. For partial
	 * fill orders, this represents a component of the limit price fraction.
	 */
	sellAmount: BigNumberish;
	/**
	 * The order buy amount.
	 *
	 * For fill or kill sell orders, this amount represents the minimum buy amount
	 * that can be executed in the trade. For fill or kill buy orders, this amount
	 * represents the exact buy amount that will be executed. For partial fill
	 * orders, this represents a component of the limit price fraction.
	 */
	buyAmount: BigNumberish;
	/**
	 * The timestamp this order is valid until
	 */
	validTo: Timestamp;
	/**
	 * Arbitrary application specific data that can be added to an order. This can
	 * also be used to ensure uniqueness between two orders with otherwise the
	 * exact same parameters.
	 */
	appData: HashLike;
	/**
	 * Fee to give to the protocol.
	 */
	feeAmount: BigNumberish;
	/**
	 * The order kind.
	 */
	kind: OrderKind;
	/**
	 * Specifies whether or not the order is partially fillable.
	 */
	partiallyFillable: boolean;
	/**
	 * Specifies how the sell token balance will be withdrawn. It can either be
	 * taken using ERC20 token allowances made directly to the Vault relayer
	 * (default) or using Balancer Vault internal or external balances.
	 */
	sellTokenBalance?: OrderBalance;
	/**
	 * Specifies how the buy token balance will be paid. It can either be paid
	 * directly in ERC20 tokens (default) in Balancer Vault internal balances.
	 */
	buyTokenBalance?: OrderBalance;
}

export type UnsignedOrder = Omit<Order, 'receiver'> & { receiver: string };
export type UnsignedUserOrder = Omit<UnsignedOrder, 'appData'>;
export type OrderFlags = Pick<Order, 'kind' | 'partiallyFillable' | 'sellTokenBalance' | 'buyTokenBalance'>;

/**
 * Gnosis Protocol v2 order cancellation data.
 */
export interface OrderCancellation {
	/**
	 * The unique identifier of the order to be cancelled.
	 */
	orderUid: BytesLike;
}
