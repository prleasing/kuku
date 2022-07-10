import { collection } from '../collection';

export function useConfirmDialog(id: string): Promise<boolean> {
	const confirm = collection.get(id);

	if (confirm) {
		return confirm();
	}
	throw new Error('Диалог не найден');
}
