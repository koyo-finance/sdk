import type { SigningScheme } from '../enums';
import { getSigningSchemeInfo } from './getSigningSchemeInfo';

export function getSigningSchemeApiValue(ecdaSigningScheme: SigningScheme): string {
	return getSigningSchemeInfo(ecdaSigningScheme).apiValue;
}
