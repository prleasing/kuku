<template>
	<teleport to="body">
		<div class="dialog-wrapper">
			<async-confirm-dialog
				v-for="dialog in dialogs"
				:id="dialog.id"
				:key="dialog.id"
				:resolve="dialog.resolve"
				v-bind="dialog.props"
			>
				<component :is="dialog.dialog" />
			</async-confirm-dialog>
		</div>
	</teleport>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { AsyncConfirmDialog, useDialogs } from '../dialog';
import { createNamespace } from '../../util';

const [name] = createNamespace('dialog-wrapper');

export default defineComponent({
	name,
	components: { AsyncConfirmDialog },
	setup() {
		const dialogsRef = useDialogs();
		const dialogs = computed(() => Object.values(dialogsRef));

		return { dialogs };
	}
});
</script>

<style lang="scss"></style>
