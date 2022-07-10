<template>
	<!--	eslint-disable-next-line vuejs-accessibility/label-has-for, vuejs-accessibility/form-control-has-label -->
	<select ref="select" v-model="selectValue" :class="classes" v-bind="$attrs" @input="onInput" @change="onChange">
		<option v-for="(item, key) in items" :key="key" :value="item">
			{{ item }}
		</option>
	</select>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { useRef } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('select-native');

export default defineComponent({
	name,
	inheritAttrs: false,
	props: {
		items: {
			type: Array as PropType<string[]>,
			required: false,
			default(this: void) {
				return [];
			}
		},
		modelValue: {
			type: [String, null] as PropType<string | null>,
			required: false,
			default(this: void) {
				return null;
			}
		}
	},
	emits: ['change', 'update:modelValue'],
	expose: ['select'],
	setup(props, { emit }) {
		const $select = useRef<HTMLSelectElement>();
		const selectValue = ref(props.modelValue);

		watch(
			() => props.modelValue,
			() => {
				selectValue.value = props.modelValue;
			}
		);
		function onInput(event: InputEvent) {
			event.stopPropagation();
			event.preventDefault();
			const target = event.target as HTMLInputElement;

			selectValue.value = target.value;
		}
		function onChange(event: Event) {
			emit('change', event);
		}

		const classes = useClasses(bem);

		// function onFocus(e: Event) {
		// 	// emit('focus', e);
		// }
		//
		// function onBlur(e: Event) {
		// 	// emit('blur', e);
		// }
		watch(selectValue, () => {
			emit('update:modelValue', selectValue.value);
		});
		return { classes, onChange, onInput, selectValue, select: $select };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/select';
.kuku-select-native {
	@include select.reset;
}
</style>
