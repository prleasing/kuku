<template>
	<div :class="classes">
		<ul ref="ul" :class="listClasses">
			<slot />
		</ul>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue';
import { nope } from '@prleasing/utility';
import { useModel, useRef } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';
import { propsTabsBase, provideKey } from './shared';

const [name, bem] = createNamespace('tabs-base');

export default defineComponent({
	name,
	props: propsTabsBase,
	expose: ['ul'],
	setup(props) {
		const $ul = useRef();

		const { modelValue: active } = useModel();

		provide(provideKey, active);

		const classesBase = computed(() => {
			const classesProps = props.classes;
			const classes = useClasses(bem, nope, {
				prefix: classesProps.length === 0
			});

			return classesProps?.concat(classes.value);
		});

		const listClasses = computed(() => props.listClasses.concat(bem('list')));

		return { ul: $ul, classesBase, listClasses, active };
	}
});
</script>

<style lang="scss"></style>
