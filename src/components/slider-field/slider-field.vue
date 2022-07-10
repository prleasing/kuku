<template>
	<div :class="classes">
		<div v-if="!editable" :class="bem('value')">
			<!--	eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
			<div @click="setEditable">{{ formattedValue }}</div>
			<slot />
		</div>
		<div v-else :class="bem('input')">
			<!--	eslint-disable-next-line vuejs-accessibility/label-has-for, vuejs-accessibility/form-control-has-label -->
			<input
				ref="input"
				v-model="modelValue"
				type="number"
				:min="minInput"
				:max="maxInput"
				:step="1"
				tabindex="-1"
				@change="onInput"
				@focus="onFocus"
				@blur="onBlur"
			/>
			<template v-if="isInputSpase">&nbsp;</template><span>{{ inputPostfix }}</span>
		</div>
		<div :class="bem('range')">
			<slider-native
				v-if="isValuesRange"
				v-bind="bind"
				v-model.number="index"
				:min="0"
				:max="values.length - 1"
				@input="onInputRangeValues"
			/>
			<slider-native
				v-else
				v-bind="bind"
				v-model.number="range"
				:min="minInput"
				:max="maxInput"
				:step="1"
				@focus="onFocus"
				@blur="onBlur"
			/>
		</div>
		<div v-if="showLabel" :class="bem('labels')">
			<span>{{ labels.min }}</span>
			<span>{{ labels.max }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUpdated, PropType, ref, watch } from 'vue';
import { omit } from '@prleasing/utility';
import { useOnFocus, useModel, useTweenNumber, useRef, useState, useToggle } from '@prleasing/use';
import { SliderNative, PropsSliderNative } from '../slider-native';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';
import { getValue } from './helper';

const [name, bem] = createNamespace('slider-field');

function formattingDefault(value: number): string {
	return value.toString();
}

type Formatting = (value: number) => string;

export default defineComponent({
	name,
	components: { SliderNative },
	inheritAttrs: true,
	props: {
		...PropsSliderNative,
		formatting: {
			type: Function as PropType<(value: number) => string>,
			required: false,
			default: formattingDefault
		},
		postfix: {
			type: [Function, String] as PropType<Formatting | string>,
			required: false,
			default: formattingDefault
		},
		showLabel: {
			type: Boolean as PropType<boolean>,
			default: true
		},
		labelMinText: {
			type: [String, Function] as PropType<string | Formatting>,
			default: null
		},
		labelMaxText: {
			type: [String, Function] as PropType<string | Formatting>,
			default: null
		},
		isInputSpase: {
			type: Boolean as PropType<boolean>,
			default: true
		},
		values: {
			type: Array as PropType<Array<number>>,
			default(this: void) {
				return [];
			}
		}
	},
	setup(props, { attrs, expose }) {
		const isValuesRange = computed(() => props.values && props.values.length > 0);
		const minInput = computed(() => {
			if (isValuesRange.value) {
				return props.values[0] ?? 0;
			}
			return props.min;
		});
		const maxInput = computed(() => {
			if (isValuesRange.value) {
				return props.values[props.values.length - 1] ?? 0;
			}
			return props.max;
		});
		const { modelValue, updateModel } = useModel<number>(false);
		const [index, setIndex] = useState(getValue(props.values, modelValue.value));
		const [range, setRange] = useState(modelValue.value);

		const [editable, , setActive, setDeactivate] = useToggle();
		const $input = useRef<HTMLInputElement>();
		const { onBlur, onFocus } = useOnFocus({
			onBlur() {
				setDeactivate();
			}
		});
		const formatting = computed(() => props.formatting ?? formattingDefault);
		const postfix = computed(() => {
			if (props.postfix) {
				if (typeof props.postfix === 'function') {
					return props.postfix;
				}
				return () => props.postfix;
			}
			return formatting.value;
		});
		const labelMin = computed(() => {
			if (props.labelMinText) {
				const { labelMinText } = props;

				if (typeof labelMinText === 'function') {
					return labelMinText(minInput.value);
				}
				return labelMinText;
			}
			return formatting.value(minInput.value);
		});
		const labelMax = computed(() => {
			if (props.labelMaxText) {
				const { labelMaxText } = props;

				if (typeof labelMaxText === 'function') {
					return labelMaxText(maxInput.value);
				}
				return labelMaxText;
			}
			return formatting.value(maxInput.value);
		});

		const labels = computed(() => ({
			min: labelMin.value,
			max: labelMax.value
		}));

		function onInput() {
			if (modelValue.value < minInput.value) {
				modelValue.value = minInput.value;
			}
			if (modelValue.value > maxInput.value) {
				modelValue.value = maxInput.value;
			}
			if (isValuesRange.value) {
				setIndex(getValue(props.values, modelValue.value));
			} else {
				setRange(modelValue.value);
			}
		}

		function setEditable() {
			setActive();
			nextTick().then(() => {
				if ($input.value) {
					$input.value.focus();
				}
			});
		}

		const formattedValue = ref(formatting.value(modelValue.value));
		const inputPostfix = computed(() => postfix.value(modelValue.value));

		function onInputRangeValues() {
			modelValue.value = props.values[index.value];
		}

		useTweenNumber(modelValue, (value) => {
			formattedValue.value = formatting.value(value);
		});

		watch(formatting, () => {
			formattedValue.value = formatting.value(modelValue.value);
		});
		watch(
			() => props.modelValue,
			() => {
				setIndex(getValue(props.values, modelValue.value));
				setRange(modelValue.value);
			}
		);
		watch(modelValue, () => {
			updateModel();
		});
		const classes = useClasses(bem);

		function calculateWidthInput() {
			if ($input.value !== null) {
				const { font } = window.getComputedStyle($input.value);
				const span = document.createElement('span');

				span.innerHTML = `${modelValue.value.toString().length === 0 ? '&nbsp;' : modelValue.value}`;
				span.style.font = font;
				document.body.append(span);
				$input.value.style.width = `${span.getBoundingClientRect().width}px`;
				span.remove();
			}
		}

		onMounted(async () => {
			await nextTick();
			calculateWidthInput();
		});
		onUpdated(async () => {
			await nextTick();
			calculateWidthInput();
		});

		const bind = computed(() => {
			if (isValuesRange.value) {
				return omit(attrs, 'onUpdate:modelValue');
			}
			return attrs;
		});

		expose({
			setEditable
		});
		return {
			labels,
			isValuesRange,
			minInput,
			maxInput,
			index,
			onInput,
			onInputRangeValues,
			range,
			editable,
			input: $input,
			setEditable,
			onBlur,
			onFocus,
			bem,
			formattedValue,
			modelValue,
			inputPostfix,
			classes,
			bind
		};
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
@use '../../assets/style/input';
@import '../text-field/style.scss';

.kuku-slider-field {
	@extend .kuku-text-field !optional;
	//padding-bottom: 0;

	&__value {
		display: flex;
		justify-content: space-between;
		pointer-events: none;
		> div:first-child {
			pointer-events: all;
			flex: 1;
			cursor: text;
		}
	}
	&__input {
		display: flex;
		> input {
			padding: 0;
			margin: 0;
			appearance: textfield;
			background: transparent;
			outline: none;
			@include input.reset();
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				/* display: none; <- Crashes Chrome on hover */
				-webkit-appearance: none;
				margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
			}
		}
	}

	&__range {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	&__labels {
		bottom: calc(#{(util.calculate-size(-24))});
		width: 100%;
		left: 0;
		pointer-events: none;
		position: absolute;
		display: flex;
		justify-content: space-between;
		font-size: calc(#{(util.calculate-size(12))});
		line-height: 150%;
		color: #98a1b7;
	}
}
</style>
