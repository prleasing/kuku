<template>
	{{ year }}
	<br />
	<br />
	<div>
		<slider-native v-model="year" :min="2000" :max="2030" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { SliderNative } from '@prleasing/kuku';
export default defineComponent({
	components: { SliderNative },
	data() {
		return { year: 2022 };
	}
});
</script>
