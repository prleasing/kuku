<template>
	<select-auto-size v-model="city" :items="items" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { SelectAutoSize } from '@prleasing/kuku';

export default defineComponent({
	components: { SelectAutoSize },
	data() {
		const items = ref(['Москва', 'Уфа']);
		const city = ref(items.value[items.value.length - 1]);

		return { city, items };
	}
});
</script>
