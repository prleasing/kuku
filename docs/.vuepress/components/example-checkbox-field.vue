<template>
	<checkbox-field v-model="remember">Запомнить меня</checkbox-field>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { CheckboxField } from '@prleasing/kuku';
export default defineComponent({
	components: { CheckboxField },
	data() {
		return { remember: false };
	}
});
</script>
