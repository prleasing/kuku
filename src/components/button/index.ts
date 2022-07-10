import { withInstall } from '../../install';
import Component from './button.vue';

export const Btn = Component;
export const buttonInstall = withInstall(Btn);

export interface BtnExpose {
	$el: HTMLElement;
}
// declare module 'vue' {
// 	export interface GlobalComponents {
// 		KukuButton: typeof Button;
// 	}
// }
