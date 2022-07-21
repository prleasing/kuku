import Component from './detail.vue';

declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		KukuDetail: typeof Component;
	}
}
export const Detail = Component;
