<template>
	<h4>Результат</h4>
	<p>{{ date }}</p>
	<div class="example"><date-range v-model="date" :gap="0" /></div>
	<div class="example">
		<date-range v-model="dateTwo" min="2022-01-01" max="2022-12-31" />
	</div>
	<div class="example">
		<form-element label="Срок путешествия">
			<date-range v-model="dateTwo" min="2022-01-01" max="2022-12-31" />
		</form-element>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { DateRange, FormElement } from '@prleasing/kuku';
export default defineComponent({
	components: { DateRange, FormElement },
	data() {
		return { date: [], dateTwo: [] };
	}
});
</script>
<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
