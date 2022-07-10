<template>
	<btn reset :class="classes" @click="open"><icon name="reference" :width="16" /></btn>
	<modal-page v-model="active">
		<slot />
	</modal-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ModalPage } from '../modal-page';
import { Icon } from '../icon';
import { Btn } from '../button';
import { createNamespace } from '../../util';
import { useClasses, useModal } from '../../composables';

const [name, bem] = createNamespace('reference');

export default defineComponent({
	name,
	components: { Icon, ModalPage, Btn },
	setup() {
		const { active, open } = useModal(false);
		const classes = useClasses(bem, () => [], {
			prefix: false
		});

		return { classes, open, active };
	}
});
</script>

<style lang="scss">
.kuku-reference {
	display: inline-block;
	.kuku-icon {
		display: inline-block;
	}
}
</style>
