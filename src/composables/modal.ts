import { useToggle } from '@prleasing/use';

export function useModal(init = false) {
	const [active, toggle, open, close] = useToggle(init);

	return { active, toggle, open, close };
}
