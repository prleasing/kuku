<template>
	<div class="example">
		<line-tabs v-model="filter">
			<line-tab-item key-tab="day">День</line-tab-item>
			<line-tab-item key-tab="week">Неделя</line-tab-item>
			<line-tab-item key-tab="mount">Месяц</line-tab-item>
			<line-tab-item key-tab="quarter">Квартал</line-tab-item>
			<line-tab-item key-tab="year">Год</line-tab-item>
		</line-tabs>
	</div>
	<p>
		{{ filter }}
	</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { LineTabs, LineTabItem } from '@prleasing/kuku';
export default defineComponent({
	components: { LineTabs, LineTabItem },
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
