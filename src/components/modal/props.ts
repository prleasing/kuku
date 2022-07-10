import { PropType } from 'vue';
import { EmptyFunction, generateId, nope } from '@prleasing/utility';
import { name } from './namespace';

export const PropsModal = {
	id: {
		type: String as PropType<string>,
		required: false,
		default(this: void) {
			return generateId(name);
		}
	},
	modelValue: {
		type: Boolean as PropType<boolean>,
		required: false,
		default(this: void) {
			return false;
		}
	},
	opacity: {
		type: Object as PropType<{ value: number; animate: boolean }>,
		default(this: void) {
			return { value: 1, animate: false };
		}
	},
	onBeforeOpen: {
		type: Function as PropType<EmptyFunction>,
		default(this: void) {
			return nope;
		}
	},
	onClose: {
		type: Function as PropType<EmptyFunction>,
		default(this: void) {
			return nope;
		}
	},
	beforeOpen: {
		type: Function as PropType<EmptyFunction>,
		default(this: void) {
			return nope;
		}
	},
	beforeClose: {
		type: Function as PropType<EmptyFunction>,
		default(this: void) {
			return nope;
		}
	},
	zIndexBase: {
		type: Number as PropType<number>,
		default: 2000
	}
};
