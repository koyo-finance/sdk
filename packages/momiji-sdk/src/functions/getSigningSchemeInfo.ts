import { MAP_SIGNING_SCHEME } from '../constants';
import type { SigningScheme } from '../enums';
import type { SchemaInfo } from '../types';
import { MomijiError } from '../utils';

export function getSigningSchemeInfo(ecdaSigningScheme: SigningScheme): SchemaInfo {
	const value = MAP_SIGNING_SCHEME.get(ecdaSigningScheme);
	if (value === undefined) {
		throw new MomijiError(`Unknown schema ${ecdaSigningScheme}`);
	}

	return value;
}
