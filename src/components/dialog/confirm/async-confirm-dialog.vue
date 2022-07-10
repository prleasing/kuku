<template>
	<confirm-dialog :id="id" v-bind="$attrs"><slot /></confirm-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import { DialogInstance, DialogType } from '../types';
import { createNamespace } from '../../../util';
import { useConfirmDialog } from './hook';
import ConfirmDialog from './confirm-dialog.vue';

const [name] = createNamespace('async-confirm-dialog');

export default defineComponent({
	name,
	components: { ConfirmDialog },
	inheritAttrs: false,
	props: {
		id: {
			type: String as PropType<string>,
			required: true
		},
		resolve: {
			type: Function as PropType<DialogInstance<DialogType.Confirm>['resolve']>,
			required: true
		}
	},
	setup(props) {
		onMounted(async () => {
			const result = useConfirmDialog(props.id);

			props.resolve(result);
		});
	}
});
</script>
