import type { SignatureTypesStructure } from '../types';

export const ORDER_CREATION_TYPE_FIELDS: SignatureTypesStructure = {
	Order: [
		{ name: 'sellToken', type: 'address' },
		{ name: 'buyToken', type: 'address' },
		{ name: 'receiver', type: 'address' },
		{ name: 'sellAmount', type: 'uint256' },
		{ name: 'buyAmount', type: 'uint256' },
		{ name: 'validTo', type: 'uint32' },
		{ name: 'appData', type: 'bytes32' },
		{ name: 'feeAmount', type: 'uint256' },
		{ name: 'kind', type: 'string' },
		{ name: 'partiallyFillable', type: 'bool' },
		{ name: 'sellTokenBalance', type: 'string' },
		{ name: 'buyTokenBalance', type: 'string' }
	]
};

export const ORDER_CANCELLATION_TYPE_FIELDS: SignatureTypesStructure = {
	OrderCancellation: [{ name: 'orderUid', type: 'bytes' }]
};
