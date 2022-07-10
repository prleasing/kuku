<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { createNamespace } from '../../../util';

const [name] = createNamespace('confirm-text');

export default defineComponent({
	name,
	props: {
		text: {
			type: String as PropType<string>,
			required: true
		}
	}
});
</script>
