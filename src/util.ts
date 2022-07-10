import { createBEM } from '@prleasing/utility';
import { PREFIX } from './constants';

export function createNamespace(name: string) {
	const prefixedName = `${PREFIX}-${name}`;

	return [prefixedName, createBEM(prefixedName)] as const;
}
