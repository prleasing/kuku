import { computed } from 'vue';
import { createBEM, nope } from '@prleasing/utility';
import { PREFIX } from '../constants';

interface Params {
	prefix: boolean;
}
export function useClasses<T extends string[]>(
	bem: ReturnType<typeof createBEM>,
	cb: () => T = nope,
	params: Partial<Params> = {}
) {
	const base: string[] = [];
	const config = { prefix: true, ...params };

	if (config.prefix) {
		base.push(PREFIX);
	}
	base.push(bem());
	return computed(() => base.concat(cb()));
}
export * from './modal';
