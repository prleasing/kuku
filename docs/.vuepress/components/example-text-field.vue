<template>
	<div class="example">
		<text-field v-model="text" />
	</div>
	<div class="example">
		<form-element label="Логин">
			<template #default="props">
				<text-field v-model="login" v-bind="props" />
			</template>
		</form-element>
	</div>
	<div class="example">
		<form-element label="Логин" error="Введите логин">
			<template #default="props">
				<text-field v-model="login" v-bind="props" />
			</template>
		</form-element>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { TextField, FormElement } from '@prleasing/kuku';
export default defineComponent({
	components: { FormElement, TextField },
	data() {
		return { text: 'Привет мир', login: 'TakNePoidet' };
	}
});
</script>

<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
