import { DefineComponent } from 'vue';
import { FunctionParameters, generateId } from '@prleasing/utility';
import { DialogResolve, DialogType } from './types';
import { useDialogs } from './state';
import { AsyncConfirmDialog, ConfirmDialog, ConfirmText } from './confirm';

export * from './confirm';

export class Dialog {
	static Confirm(text: string, props: Omit<InstanceType<typeof ConfirmDialog>['$props'], 'text'> = {}) {
		return Dialog.AsyncDialog(DialogType.Confirm, ConfirmText, { ...props, text });
	}

	static AsyncDialog<T extends DialogType, C extends DefineComponent<any, any, any, any>>(
		type: T,
		dialog: C,
		props: InstanceType<typeof ConfirmDialog>['$props'] = {}
	): Promise<FunctionParameters<DialogResolve[T], 0>> {
		return new Promise((resolve, reject) => {
			try {
				const id = generateId(AsyncConfirmDialog.name);

				useDialogs()[id] = {
					type,
					id,
					dialog: dialog as DefineComponent,
					props,
					resolve
				};
			} catch (e) {
				reject(e);
			}
		});
	}
}
