import { DialogManager, DialogResolve, DialogType } from './types';

type Collection = Map<string, DialogManager<any>>;
export const collection: Collection = new Map();

export function register<T extends DialogType>(_: T, id: string, manager: DialogResolve[T]) {
	collection.set(id, manager);
}
export function unregister(id: string) {
	collection.delete(id);
}
