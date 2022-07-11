<template>
	<div class="examples-button">
		<btn>Обычная кнопка</btn>
		<btn brand>Брендированная кнопка</btn>
		<btn reset>Дефолтная кнопка</btn>
		<btn block>Блочная кнопка</btn>
		<btn :disabled="true">Заблокированная кнопка</btn>
		<btn :style-button="'secondary'">Стиль secondary</btn>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Btn } from '../../../src';
export default defineComponent({
	name: 'ExampleButton',
	components: { Btn }
});
</script>

<style lang="scss" scoped>
.examples-button {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	> .kuku-button {
		flex: 0 0 auto;
	}
}
</style>
