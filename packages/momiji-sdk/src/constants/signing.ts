import { SigningScheme } from '../enums';
import type { SchemaInfo, SignatureTypesStructure } from '../types';

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

export const MAP_SIGNING_SCHEME: Map<SigningScheme, SchemaInfo> = new Map([
	[SigningScheme.EIP712, { libraryValue: 0, apiValue: 'eip712' }],
	[SigningScheme.ETHSIGN, { libraryValue: 1, apiValue: 'ethsign' }],
	[SigningScheme.EIP1271, { libraryValue: 2, apiValue: 'eip1271' }],
	[SigningScheme.PRESIGN, { libraryValue: 3, apiValue: 'presign' }]
]);
