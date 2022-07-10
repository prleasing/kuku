import { ref } from 'vue';
import { Overlay } from '../overlay';

interface Stack {
	id: string;
	show: boolean;
	overlay: InstanceType<typeof Overlay>;
}
export const stack = ref<Array<Stack>>([]);
