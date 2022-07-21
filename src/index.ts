// eslint-disable-next-line import/order
// import { App, Plugin } from 'vue';
// import { KukuDialog } from './plugins/dialog';
import './assets/style/index.scss';
import 'virtual:svg-icons-register';

export * from './plugins/dialog';
export * from './components';
export * from './composables';

export function iconInject() {
	// @ts-ignore
	return import('virtual:svg-icons-register');
}

// export const Kuku: Plugin = {
// 	install(app: App) {
// 		app.use(KukuDialog);
// 	}
// };
