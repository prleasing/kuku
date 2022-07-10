<template>
	<div :class="classes">
		<input
			v-for="index in length"
			:key="index"
			:ref="
				(el) => {
					if (el) inputs[index - 1] = el;
				}
			"
			:value="values[index - 1]"
			size="1"
			:data-id="index"
			:autocomplete="index"
			@input="onValueChange"
			@keydown="onKeyDown"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRef, watch } from 'vue';
import { useRef } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('code-field');

enum KeyCode {
	Backspace = 'Backspace',
	Left = 'ArrowLeft',
	Up = 'ArrowDown',
	Right = 'ArrowRight',
	Down = 'ArrowDown'
}
export default defineComponent({
	name,
	props: {
		size: {
			type: Number as PropType<number>,
			default: 4
		},
		modelValue: {
			type: [String] as PropType<string>,
			required: false,
			default(this: void) {
				return '';
			}
		}
	},
	setup(props, { emit }) {
		const length = toRef(props, 'size');
		const inputs = useRef<HTMLInputElement>(true);

		function fromPropsValue(value: string): string[] {
			const arr = Array.from(value);

			arr.length = length.value;
			return arr;
		}
		const arrayValues = ref<Array<string | null>>(fromPropsValue(props.modelValue));
		const value = computed(() => arrayValues.value.join(''));

		function onValueChange(e: InputEvent) {
			const target = e.target as HTMLInputElement | null;

			if (!target || typeof target.dataset.id === 'undefined') {
				e.preventDefault();
				return;
			}
			const index = parseInt(target.dataset.id, 10) - 1;
			const value = target.value.trim();
			let next = 0;

			if (value.length > 1) {
				[...value].forEach((char, key) => {
					if (index + key < length.value) {
						inputs.value[index + key].value = char;
						arrayValues.value[index + key] = char;
						next = index + key + 1;
					}
				});
			} else {
				arrayValues.value[index] = target.value.trim();
				next = index + 1;
			}
			if (next && length.value > next) {
				const element: HTMLInputElement = inputs.value[next];

				element.focus();
			} else {
				inputs.value[inputs.value.length - 1].focus();
			}
		}

		function onKeyDown(e: KeyboardEvent) {
			const target = e.target as HTMLInputElement | null;

			if (!target || typeof target.dataset.id === 'undefined') {
				e.preventDefault();
				return;
			}
			const index = parseInt(target.dataset.id, 10) - 1;
			const prevIndex = index - 1;
			const nextIndex = index + 1;
			const prev = inputs.value[prevIndex];
			const next = inputs.value[nextIndex];

			switch (e.code) {
				case KeyCode.Backspace:
					e.preventDefault();
					inputs.value[index].value = '';
					arrayValues.value[index] = null;

					for (let i = index; i < length.value; i += 1) {
						const value = arrayValues.value[i + 1];

						inputs.value[i].value = value ?? '';
						arrayValues.value[i] = value ?? null;
					}
					if (prev && value.value.length <= index) {
						prev.focus();
					}
					break;
				case KeyCode.Left:
					e.preventDefault();
					if (prev) {
						prev.focus();
					}
					break;
				case KeyCode.Right:
					e.preventDefault();
					if (next) {
						next.focus();
					}
					break;
				case KeyCode.Up:
				case KeyCode.Down:
					e.preventDefault();
					break;
				default:
					// this.handleKeys[index] = true;
					break;
			}
		}

		const classes = useClasses(bem);

		function trigger() {
			emit('update:modelValue', value.value);
		}
		watch(
			() => props.modelValue,
			() => {
				arrayValues.value = fromPropsValue(props.modelValue);
			}
		);
		watch(length, () => {
			arrayValues.value.length = length.value;
		});
		trigger();
		watch(value, () => trigger());
		return { values: arrayValues, length, onValueChange, inputs, onKeyDown, classes };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-code-field {
	display: inline-flex;
	flex-wrap: nowrap;
	& > input {
		border: 1px transparent solid;
		appearance: none;
		border-radius: calc(#{(util.calculate-size(8))});
		padding: calc(#{(util.calculate-size(2))});
		text-align: center;
		background: #efeff3;
		width: calc(#{(util.calculate-size(36))});
		height: calc(#{(util.calculate-size(40))});
		font-weight: 600;
		font-size: calc(#{(util.calculate-size(20))});
		line-height: 120%;
		transition: color 200ms ease-in-out, background-color 200ms ease-in-out, border 200ms ease-in-out;
	}
	& > input + input {
		margin-left: calc(#{(util.calculate-size(8))});
	}
}
</style>
