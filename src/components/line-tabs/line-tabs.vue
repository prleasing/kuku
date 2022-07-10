<template>
	<tabs-base ref="root" :class="classes" :active="active" :list-classes="listClasses">
		<slot />
	</tabs-base>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUpdated, watch } from 'vue';
import { useExpose, useModel } from '@prleasing/use';
import { TabsBase, propsTabsBase } from '../tabs-base';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('line-tabs');

export default defineComponent({
	name,
	components: { TabsBase },
	props: propsTabsBase,
	setup() {
		const $root = useExpose(TabsBase);
		const { modelValue: active } = useModel();

		function updateIndicator() {
			if ($root.value && $root.value.ul !== null) {
				const $active = $root?.value?.ul.querySelector(`[data-key-tab="${active.value}"]`);

				if (!$active) {
					return;
				}
				const { left, width } = $active.getBoundingClientRect();
				const { left: containerLeft } = $root.value.ul.getBoundingClientRect();
				const x = left - (containerLeft + window.scrollX);

				$root.value.ul.style.setProperty('--kuku--line-tabs-indicator-width', `${width}px`);
				$root.value.ul.style.setProperty('--kuku--line-tabs-indicator-left', `${x}px`);
			}
		}
		onUpdated(async () => {
			await nextTick();
		});
		onMounted(async () => {
			await nextTick();
			updateIndicator();
		});

		watch(active, () => {
			updateIndicator();
		});

		const classes = useClasses(bem);
		const listClasses = bem('list');

		return { root: $root, classes, listClasses };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-line-tabs {
	position: relative;
	&__list {
		display: flex;
		flex-wrap: nowrap;
		padding: 0;
		margin: 0;
		list-style: none;
		position: relative;
		justify-content: space-between;
		.kuku-line-tab-item {
			flex: 1 1 auto;
		}
		&:after {
			position: absolute;
			content: '';
			bottom: 0;
			display: block;
			height: calc(#{(util.calculate-size(2))});
			background-color: #2ab37b;
			width: var(--kuku--line-tabs-indicator-width);
			left: var(--kuku--line-tabs-indicator-left);
			transition: left 200ms ease-in-out, width 200ms ease-in-out;
		}
	}
	&:after {
		position: absolute;
		content: '';
		bottom: 0;
		display: block;
		height: calc(#{(util.calculate-size(1))});
		background-color: rgba(100, 100, 114, 0.24);
		width: 100%;
		left: 0;
	}
}
</style>
