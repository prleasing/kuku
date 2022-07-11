<template>
	<div class="example">
		<tabs v-model="filter">
			<tab-item key-tab="day">День</tab-item>
			<tab-item key-tab="week">Неделя</tab-item>
			<tab-item key-tab="mount">Месяц</tab-item>
			<tab-item key-tab="quarter">Квартал</tab-item>
			<tab-item key-tab="year">Год</tab-item>
		</tabs>
	</div>
	<p>
		{{ filter }}
	</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Tabs, TabItem } from '@prleasing/kuku';
export default defineComponent({
	components: { Tabs, TabItem },
	data() {
		return { filter: 'day' };
	}
});
</script>

<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
