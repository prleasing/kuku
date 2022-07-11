<template>
	<h4>Результат</h4>
	<p>{{ city }}</p>
	<div class="example">
		<select-field v-model="city" :items="items" placeholder="Выберите город" />
	</div>
	<div class="example">
		<select-field v-model="city" :items="items" placeholder="Выберите город">
			<template #current="{ item }">
				{{ item.title }}
			</template>
			<template #option="{ item }">
				{{ item.title }}
			</template>
		</select-field>
	</div>
	<div class="example">
		<form-element label="Город проживания">
			<template #default="props">
				<select-field v-model="city" v-bind="props" :items="items" placeholder="Выберите город">
					<template #current="{ item }">
						{{ item.title }}
					</template>
					<template #option="{ item }">
						{{ item.title }}
					</template>
				</select-field>
			</template>
		</form-element>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { SelectField, FormElement } from '@prleasing/kuku';
export default defineComponent({
	components: { SelectField, FormElement },
	data() {
		const items = ref([
			{ key: 'moscow', title: 'Москва' },
			{ key: 'ufa', title: 'Уфа' }
		]);

		const city = ref();

		return { city, items };
	}
});
</script>

<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
