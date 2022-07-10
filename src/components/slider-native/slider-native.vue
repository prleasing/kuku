<template>
	<!--	eslint-disable-next-line vuejs-accessibility/label-has-for, vuejs-accessibility/form-control-has-label -->
	<input
		ref="range"
		v-model.number="modelValue"
		:class="classes"
		:min="min"
		:max="max"
		type="range"
		v-bind="focus"
		@input="onInput"
	/>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, watch } from 'vue';
import { useOnFocus, useModel, useRef } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';
import { PropsSliderNative } from './props';

const [name, bem] = createNamespace('slider-native');

export default defineComponent({
	name,
	props: PropsSliderNative,
	emits: ['update:modelValue', 'focus', 'blur', 'input'],
	setup(_, { emit }) {
		const { isFocus, ...focus } = useOnFocus();

		const { modelValue, updateModel } = useModel();
		const classes = useClasses(bem, () =>
			bem({
				focus: isFocus.value
			})
		);

		const $range = useRef<HTMLInputElement>();

		function calculateRangePercentage() {
			const target = $range.value as HTMLInputElement;
			const min = parseInt(target.min, 10);
			const max = parseInt(target.max, 10);
			const currentValue = parseInt(target.value, 10);
			const percent = ((currentValue - min) * 100) / (max - min);

			target.style.setProperty('--value', `${percent}%`);
		}

		function onInput(event: InputEvent) {
			emit('input', event);
		}
		onMounted(() => {
			calculateRangePercentage();
		});
		onUpdated(() => {
			calculateRangePercentage();
		});

		watch(modelValue, () => {
			updateModel();
		});
		return { range: $range, classes, focus, modelValue, onInput };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';

.kuku-slider-native {
	display: block;
	width: 100%;
	appearance: none;
	height: 1px;
	background: #98a1b7;
	color: #ee5c5c;
	--kuku--range-filed-background: #efeff3;

	&::-webkit-slider-thumb {
		display: block;
		width: calc(#{(util.calculate-size(16))});
		height: calc(#{(util.calculate-size(16))});
		background: #f8f8fa;
		border: calc(#{(util.calculate-size(4))}) solid currentcolor;
		border-radius: calc(#{(util.calculate-size(8))});
		transform: translate(calc(#{(util.calculate-size(0))}), calc(#{(util.calculate-size(-7))}));
		cursor: pointer;
		appearance: none;
		box-shadow: 0 calc(#{(util.calculate-size(4))}) calc(#{(util.calculate-size(12))}) rgba(75, 16, 16, 0.24);
	}

	&::-webkit-slider-runnable-track {
		width: 100%;
		height: calc(#{(util.calculate-size(2))});
		transition: background-color 200ms ease-in-out;
		background: var(--kuku--range-filed-background)
			linear-gradient(to right, currentColor var(--value, 20%), transparent var(--value, 20%));
		cursor: pointer;
	}

	&--focus {
		--kuku--range-filed-background: #98a1b7;
	}
}
</style>
