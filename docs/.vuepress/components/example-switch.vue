<template>
	<div class="example">
		<toggle-switch>Оформить страховку</toggle-switch><br />
		<toggle-switch>Включить уведомления</toggle-switch>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ToggleSwitch } from '@prleasing/kuku';
export default defineComponent({
	components: { ToggleSwitch }
});
</script>

<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
