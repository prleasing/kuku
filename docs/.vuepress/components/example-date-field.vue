<template>
	<div class="example">
		<date-field v-model="date" />
	</div>
	<div class="example">
		<form-element label="Дата конференции">
			<template #default="props">
				<date-field min="2022-01-01" max="2022-12-31" v-bind="props" />
			</template>
		</form-element>
	</div>
	<div class="example">
		<h4>Форматирование даты в контроле</h4>
		<form-element label="Дата конференции" error="Ошибка выбора даты">
			<template #default="props">
				<date-field min="2022-01-01" max="2022-12-31" v-model="dateTwo" :fmp="fmt" />
			</template>
		</form-element>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { DateField, FormElement } from '@prleasing/kuku';

export default defineComponent({
	components: { DateField, FormElement },
	data() {
		return { date: '2022-07-14', dateTwo: '2022-07-14' };
	},
	methods: {
		fmt(dateTime) {
			return dateTime.toISODate();
		}
	}
});
</script>
<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
