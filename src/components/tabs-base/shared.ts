import { InjectionKey, PropType, Ref } from 'vue';

export const propsTabsBase = {
	modelValue: {
		type: String as PropType<string | null>,
		required: false
	},
	active: {
		type: String as PropType<string | null>,
		required: false
	},
	classes: {
		type: Array as PropType<string[]>,
		required: false,
		default(this: void) {
			return [];
		}
	},
	listClasses: {
		type: Array as PropType<string[]>,
		required: false,
		default(this: void) {
			return [];
		}
	}
};
export const provideKey: InjectionKey<Ref<string>> = Symbol('active-tab');
