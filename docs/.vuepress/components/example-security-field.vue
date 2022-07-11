<template>
	<div class="example">
		<security-field v-model="text" />
	</div>
	<div class="example">
		<form-element label="Пароль">
			<template #default="props">
				<security-field v-model="password" v-bind="props" />
			</template>
		</form-element>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { SecurityField, FormElement } from '@prleasing/kuku';

export default defineComponent({
	components: { SecurityField, FormElement },
	data() {
		return { text: '12345678', password: '' };
	}
});
</script>
<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
