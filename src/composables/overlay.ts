import { ref } from 'vue';
import { OverlayExpose } from '../components/overlay';

export function useOverlay() {
	return ref<OverlayExpose | null>(null);
}
