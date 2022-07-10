import { shallowReactive } from 'vue';
import type { DialogInstance } from './types';

const dialogsRef = shallowReactive<Record<string, DialogInstance<any>>>({});

export function useDialogs() {
	return dialogsRef;
}
