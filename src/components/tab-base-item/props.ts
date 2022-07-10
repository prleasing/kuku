import { RouteLocationRaw } from 'vue-router';
import { PropType } from 'vue';

export const propsTabBaseItem = {
	tag: {
		type: String as PropType<keyof HTMLElementTagNameMap>,
		default: 'button'
	},
	to: {
		type: Object as PropType<RouteLocationRaw | null>,
		required: false,
		default: null
	},
	keyTab: {
		type: String as PropType<string>,
		required: true
	}
};
