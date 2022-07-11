<template>
	<div class="example">
		<icon v-for="item in icons" :name="item" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Icon } from '@prleasing/kuku';

export default defineComponent({
	components: { Icon },
	data() {
		return {
			icons: [
				'copy',
				'truck',
				'briefcase',
				'calculator',
				'eye',
				'home',
				'arrow-left',
				'medicine',
				'calendar',
				'real-estate',
				'message',
				'youtube',
				'telegram',
				'tractor',
				'angle-left',
				'monitoring',
				'angle-right',
				'tick',
				'arrow-right',
				'euro',
				'navigator',
				'reference',
				'plane',
				'dollar',
				'ruble',
				'angle-down',
				'tenchat',
				'eye-closed',
				'train',
				'money',
				'treaties',
				'exit',
				'fire',
				'escalator',
				'news',
				'maps',
				'profile',
				'tiktok',
				'phone',
				'check-mark',
				'contacts',
				'application',
				'vk',
				'crane',
				'axe',
				'pills',
				'yacht'
			]
		};
	}
});
</script>

<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
