<template>
	<dialog-wrapper />
	<div class="example">
		<btn @click="confirm">Cпросить</btn>
	</div>
	<p>
		<b>{{ result }}</b>
	</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { Dialog, Btn, DialogWrapper } from '@prleasing/kuku';

export default defineComponent({
	components: { Btn, DialogWrapper },
	setup() {
		const result = ref<boolean | null>(null);
		async function confirm() {
			console.log(1);
			result.value = await Dialog.Confirm('Вам нравится?', {});
		}

		return { confirm, result };
	}
});
</script>

<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
