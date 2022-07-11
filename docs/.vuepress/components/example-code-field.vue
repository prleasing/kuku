<template>
	<div class="example">
		<form-code-element label="Введите код авторизации">
			<code-field v-model="code" />
		</form-code-element>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { CodeField, FormCodeElement } from '@prleasing/kuku';

export default defineComponent({
	components: { CodeField, FormCodeElement },
	data() {
		return {
			code: ''
		};
	}
});
</script>

<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
