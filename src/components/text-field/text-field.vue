<template>
	<input
		:id="id"
		v-bind="$attrs"
		ref="input"
		:autocomplete="autocomplete ? 'on' : id"
		:class="classes"
		:value="inputValue"
		@input="onInput"
		@focus="onFocus"
		@blur="onBlur"
		@change="onChange"
	/>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';
import { propsTextField } from './props';

const [name, bem] = createNamespace('text-field');

export default defineComponent({
	name,
	props: propsTextField,
	setup(props, { emit }) {
		const inputValue = ref(props.modelValue);

		watch(
			() => props.modelValue,
			() => {
				inputValue.value = props.modelValue;
			}
		);
		function onInput(event: InputEvent) {
			event.stopPropagation();
			event.preventDefault();
			const target = event.target as HTMLInputElement;

			inputValue.value = target.value;
		}
		function onChange() {
			emit('change', inputValue.value);
		}
		function onFocus(e: Event) {
			emit('focus', e);
		}

		function onBlur(e: Event) {
			emit('blur', e);
		}
		watch(inputValue, () => {
			emit('update:modelValue', inputValue.value);
		});
		const classes = useClasses(bem);

		return { inputValue, classes, onChange, onInput, onBlur, onFocus };
	}
});
</script>

<style lang="scss">
@import './style';
</style>
