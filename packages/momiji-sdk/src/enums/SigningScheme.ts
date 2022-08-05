/**
 * The signing scheme used to sign the order.
 */
export enum SigningScheme {
	/**
	 * The EIP-712 typed data signing scheme. This is the preferred scheme as it
	 * provides more infomation to wallets performing the signature on the data
	 * being signed.
	 *
	 * <https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md#definition-of-domainseparator>
	 */
	EIP712 = 0b00,
	/**
	 * Message signed using eth_sign RPC call.
	 */
	ETHSIGN = 0b01,
	/**
	 * Smart contract signatures as defined in EIP-1271.
	 *
	 * <https://eips.ethereum.org/EIPS/eip-1271>
	 */
	EIP1271 = 0b10,
	/**
	 * Pre-signed order.
	 */
	PRESIGN = 0b11
}
