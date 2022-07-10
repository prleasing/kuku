<template>
	<li
		:data-key-tab="keyTab"
		v-bind="$attrs"
		:data-key="keyTab"
		role="tab"
		tabindex="0"
		@keydown.prevent.space="set(keyTab)"
	>
		<component :is="tagElement" tabindex="0" class="tab-base-item__title" :to="to" @click="set(keyTab)"
			><slot
		/></component>
	</li>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { provideKey } from '../tabs-base';
import { Btn } from '../button';
import { createNamespace } from '../../util';
import { propsTabBaseItem } from './props';

const [name] = createNamespace('tab-base-item');

export default defineComponent({
	name,
	components: { Btn },
	inheritAttrs: false,
	props: { ...propsTabBaseItem },
	setup(props) {
		const tagElement = computed(() => (props.to !== null ? 'router-link' : props.tag));
		const active = inject(provideKey);

		function set(key: string) {
			if (active) {
				active.value = key;
			}
		}
		return { tagElement, set };
	}
});
</script>
