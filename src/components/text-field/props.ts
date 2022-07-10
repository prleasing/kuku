import { PropType } from 'vue';
import { generateId } from '@prleasing/utility';

export const propsTextField = {
	id: {
		type: String as PropType<string>,
		required: false,
		default(this: void) {
			return generateId();
		}
	},
	autocomplete: {
		type: Boolean as PropType<boolean>,
		required: false,
		default(this: void) {
			return false;
		}
	},
	modelValue: {
		type: [Number, String] as PropType<string | number>,
		required: false,
		default(this: void) {
			return '';
		}
	}
};
