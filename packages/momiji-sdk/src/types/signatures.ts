import type { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer';
import type { ethers } from 'ethers';
import type { SigningScheme } from '../enums';

export type SignatureTypesStructure = Record<string, Array<TypedDataField>>;

// Temporary until TypedDataSigner is added in ethers (in v6)
export type Signer = ethers.Signer & {
	_signTypedData(domain: TypedDataDomain, types: SignatureTypesStructure, value: Record<string, any>): Promise<string>;
};

export interface SigningResult {
	signature?: string;
	signingScheme: SigningScheme;
}
