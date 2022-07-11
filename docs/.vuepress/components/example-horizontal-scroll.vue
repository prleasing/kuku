<template>
	<horizontal-scroll class="example">
		<toggle-switch>Оформить страховку</toggle-switch>
		<toggle-switch>Включить уведомления</toggle-switch>
		<toggle-switch>Подписаться на актуальные новости</toggle-switch>
	</horizontal-scroll>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ToggleSwitch, HorizontalScroll } from '@prleasing/kuku';
export default defineComponent({
	components: { HorizontalScroll, ToggleSwitch }
});
</script>

<style lang="scss">
.example + .example {
	margin-top: 40px;
}
.kuku-horizontal-scroll {
	.kuku-horizontal-scroll__scroll {
		gap: 20px;
	}
}
</style>
