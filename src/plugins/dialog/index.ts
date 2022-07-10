import { App, Plugin } from 'vue';
import { DialogWrapper, ConfirmDialog, AsyncConfirmDialog, ConfirmText } from '../../components';

export const KukuDialog: Plugin = {
	install(app: App) {
		app.component(ConfirmDialog.name, ConfirmDialog);
		app.component(AsyncConfirmDialog.name, AsyncConfirmDialog);
		app.component(ConfirmText.name, ConfirmText);
		app.component(DialogWrapper.name, DialogWrapper);
	}
};
