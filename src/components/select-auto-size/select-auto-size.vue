<template>
	<div :class="classes">
		<select-native v-bind="$attrs" ref="selectNative" @change="onChange" />
		<icon ref="angle" name="angle-down" :width="16" />
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import { SelectNative } from '../select-native';
import { Icon } from '../icon';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('select-auto-size');

export default defineComponent({
	name,
	components: { Icon, SelectNative },
	inheritAttrs: false,

	setup() {
		const selectNative = ref<{ select: HTMLSelectElement }>();

		function resize() {
			const select = selectNative.value?.select;

			if (select) {
				const { fontWeight, fontSize, fontFamily } = window.getComputedStyle(select);
				const text = select.selectedOptions[0]?.text ?? 'Выберите';

				const ghostText = document.createElement('span');

				Object.assign(ghostText.style, {
					fontSize,
					fontWeight,
					fontFamily,
					visibility: 'hidden' // prevents FOUC
				});
				ghostText.innerText = text;
				document.body.append(ghostText);
				select.style.setProperty('--kuku--select-text-option', `${ghostText.offsetWidth.toString()}px`);
				ghostText.remove();
			}
		}
		onMounted(() => {
			nextTick().then(resize);
			window.addEventListener('resize', resize);
		});
		onUpdated(() => {
			nextTick().then(resize);
			window.addEventListener('resize', resize);
		});
		onBeforeUpdate(() => {
			window.removeEventListener('resize', resize);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('resize', resize);
		});

		function onChange() {
			resize();
		}
		const classes = useClasses(bem);

		return { classes, selectNative, onChange };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
@use 'sass:math';
.kuku-select-auto-size {
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	position: relative;

	--kuku--select-text-option: calc(#{(util.calculate-size(30))});
	--kuku--select-angle-size: calc(#{(util.calculate-size(16))});
	.kuku-select-native {
		appearance: none;
		overflow: revert;
		width: calc(var(--kuku--select-angle-size) + var(--kuku--select-text-option) + #{(util.calculate-size(4))});
		padding-right: var(--kuku--select-angle-size);
	}
	.kuku-icon {
		position: absolute;
		right: 0;
		top: calc(50% - #{(util.calculate-size((8)))});
		pointer-events: none;
	}
}
</style>
