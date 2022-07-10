import { PropType } from 'vue';
import { generateId } from '@prleasing/utility';
import { name } from './namespace';

export const PropsFormElement = {
	id: {
		type: String as PropType<string>,
		required: false,
		default(this: void) {
			return generateId(name);
		}
	},
	label: {
		type: String as PropType<string>,
		required: false,
		default(this: void) {
			return '';
		}
	},
	error: {
		type: String as PropType<string | null>,
		required: false,
		default(this: void) {
			return null;
		}
	}
};
