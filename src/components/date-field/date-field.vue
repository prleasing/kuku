<template>
	<label :for="id" :class="classes">
		<input
			:id="id"
			ref="input"
			:value="select"
			type="date"
			:class="bem('input')"
			:min="min"
			:max="max"
			tabindex="-1"
			@blur="onBlur"
			@focus="onFocus"
			@change="onChange"
		/>
		<button :class="bem('button')" @click="focus" @keydown.space.stop="focus">{{ formatted }}</button>
	</label>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { DateTime } from 'luxon';
import { generateId } from '@prleasing/utility';
import { useFocus, useFocusElement, useModel, useRef, useToggle } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('data-filed');

const fmpDefault = (date: DateTime) => date.toLocaleString();

export default defineComponent({
	name,
	props: {
		min: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return DateTime.now().set({ year: 2010, day: 1, month: 1 }).toISODate();
			}
		},
		max: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return DateTime.now().plus({ year: 5 }).endOf('year').toISODate();
			}
		},
		modelValue: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return DateTime.now().toISODate();
			}
		},
		fmp: {
			type: Function as PropType<(date: DateTime) => string>,
			required: false,
			default: null
		}
	},
	expose: ['blur', 'focus'],
	emits: ['change', 'focus', 'blur', 'update:modelValue'],
	setup(props, { emit }) {
		const id = generateId(name);

		const fmp = computed(() => props.fmp ?? fmpDefault);
		const min = computed(() => DateTime.fromISO(props.min));
		const max = computed(() => DateTime.fromISO(props.max));
		const input = useRef<HTMLInputElement>();
		const { modelValue: select } = useModel<string>(true);

		const [opened] = useToggle(false);
		const classes = useClasses(bem, () =>
			bem({
				opened: opened.value
			})
		);
		const formatted = computed(() => fmp.value(DateTime.fromISO(select.value)));
		const [focus, blur] = useFocusElement(input);

		function onChange(event: InputEvent) {
			const target = event.target as HTMLInputElement;
			let { value } = target;
			let fromDateTime = DateTime.fromISO(value);

			if (!fromDateTime.isValid) {
				fromDateTime = DateTime.now();
				value = fromDateTime.toISODate();
			}

			const fromSeconds = fromDateTime.toSeconds();

			if (fromSeconds < min.value.toSeconds()) {
				value = min.value.toISODate();
			}
			if (fromSeconds > max.value.toSeconds()) {
				value = max.value.toISODate();
			}
			emit('change', event);
			select.value = value;
		}

		function focusInput(event: FocusEvent) {
			const target = event.target as HTMLInputElement | null;

			if (target && target.type === 'date') {
				opened.value = true;
				// @ts-ignore
				if (target.showPicker && typeof target.showPicker === 'function') {
					// @ts-ignore
					target.showPicker();
				}
			}
		}
		const { focus: onFocus, blur: onBlur } = useFocus({
			onFocus(event) {
				emit('focus');
				focusInput(event);
			},
			onBlur() {
				opened.value = false;
				emit('blur');
			}
		});

		return { id, classes, bem, select, formatted, input, onFocus, onBlur, focus, blur, onChange };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
@use '../../assets/style/button';
@use 'sass:color';
.kuku-data-filed {
	$self: &;
	position: relative;
	display: block;
	background-color: transparent;
	--kuku--data-filed-color: #403e4b;
	@include util.to-hsl($color: #efeff3, $property: '--kuku--data-filed-bg');
	//--kuku--data-filed-bg: #efeff3;
	//--kuku--data-filed-bg-h: #{color.hue(#efeff3)};
	//--kuku--data-filed-bg-s: #{color.saturation(#efeff3)};
	//--kuku--data-filed-bg-l: #{color.lightness(#efeff3)};
	> input[type='date'] {
		position: absolute;
		width: 100%;
		height: 100%;
		display: block;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		opacity: 0;
	}
	&__button {
		@include button.reset;
		position: relative;
		cursor: pointer;
		background-color: var(--kuku--data-filed-bg);
		border-radius: calc(#{(util.calculate-size(4))});
		display: flex;
		align-items: center;
		justify-content: center;
		padding: calc(#{(util.calculate-size(10))}) calc(#{(util.calculate-size(6))});
		transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
		font-style: normal;
		font-weight: 500;
		font-size: calc(#{(util.calculate-size(14))});
		line-height: 100%;
		color: var(--kuku--data-filed-color);
		@media (hover: hover) {
			&:hover {
				background-color: util.lightness($property: '--kuku--data-filed-bg', $value: -5);
			}
		}
		&:focus-visible {
			background-color: util.lightness($property: '--kuku--data-filed-bg', $value: -5);
		}
		&:active {
			background-color: util.lightness($property: '--kuku--data-filed-bg', $value: -10);
		}
	}
	&#{$self}--opened {
		#{$self}__button {
			background-color: #28272f;
			color: #ffffff;
		}
	}
}
</style>
