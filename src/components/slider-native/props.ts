import { PropType } from 'vue';

export const PropsSliderNative = {
	min: {
		type: Number as PropType<number>,
		required: false,
		default(this: void) {
			return 0;
		}
	},
	max: {
		type: Number as PropType<number>,
		required: false,
		default(this: void) {
			return 10;
		}
	},
	modelValue: {
		type: [Number],
		required: false,
		default(this: void) {
			return 0;
		}
	}
};
