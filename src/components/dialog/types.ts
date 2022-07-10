import { DefineComponent } from 'vue';

export enum DialogType {
	Confirm = 'confirm'
}

export interface DialogResolve {
	[DialogType.Confirm]: (value: boolean | PromiseLike<boolean>) => void;
}

export interface DialogInstance<T extends DialogType> {
	id: string;
	type: T;
	dialog: DefineComponent<any>;
	props: any;
	resolve: DialogResolve[T];
}
export type DialogManager<T extends DialogType> = DialogInstance<T>['resolve'];
