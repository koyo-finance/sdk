import type { SigningScheme } from '../enums';
import { getSigningSchemeInfo } from './getSigningSchemeInfo';

export function getSigningSchemeLibValue(ecdaSigningScheme: SigningScheme): number {
	return getSigningSchemeInfo(ecdaSigningScheme).libraryValue;
}
