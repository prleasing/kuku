<template>
	<div :class="classes">
		<div v-if="state === ''" :class="bem('placeholder')">{{ placeholder }}</div>
		<div v-else :class="bem('value')">
			<slot name="current" :item="currentItem">
				{{ currentItem.key }}
			</slot>
		</div>
		<icon :class="bem('angle')" name="angle-down" :width="16" />
		<!--	eslint-disable-next-line vuejs-accessibility/label-has-for, vuejs-accessibility/form-control-has-label -->
		<select :id="id" v-model="state" :class="bem('select')" @blur="onBlur" @focus="onFocus">
			<option v-if="placeholder" selected value="" disabled>{{ placeholder }}</option>
			<option v-for="item in items" :key="item.key" :value="item.key">
				<slot name="option" :item="item">
					{{ item.key }}
				</slot>
			</option>
		</select>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue';
import { EmptyObject, generateId } from '@prleasing/utility';
import { useState } from '@prleasing/use';
import { Icon } from '../icon';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('select-field');

interface Item extends EmptyObject {
	key: string;
}

export default defineComponent({
	name,
	components: { Icon },
	props: {
		id: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return generateId();
			}
		},
		items: {
			type: Array as PropType<Item[]>,
			required: true,
			default(this: void) {
				return [];
			}
		},
		modelValue: {
			type: [Object, null] as PropType<Item | null>,
			required: true,
			default(this: void) {
				return { key: '' };
			}
		},
		placeholder: {
			type: String as PropType<string | undefined>,
			default: undefined
		}
	},
	emits: ['focus', 'blur', 'update:modelValue'],
	setup(props, { emit }) {
		function findValue(value: string) {
			return props.items.find((item) => item.key === value);
		}
		const [state] = useState<string>(props.modelValue?.key ?? '');
		const classes = useClasses(bem, () =>
			bem({
				placeholder: state.value === ''
			})
		);

		function onFocus(e: Event) {
			emit('focus', e);
		}

		function onBlur(e: Event) {
			emit('blur', e);
		}

		const currentItem = computed(() => findValue(state.value));

		watch(
			() => props.modelValue?.key,
			(value) => {
				state.value = value ?? '';
			}
		);
		watch(currentItem, (value) => {
			emit('update:modelValue', value);
		});
		return { bem, state, classes, onBlur, onFocus, currentItem };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/input';
@use '../../assets/style/util';

.kuku-select-field {
	$self: &;
	overflow: hidden;
	@include input.reset();
	--text-field-border-radius: calc(#{(util.calculate-size(8))});
	position: relative;
	cursor: pointer;
	color: var(--text-field-color);
	border: none;
	background: var(--kuku--text-field-background);
	border-radius: var(--text-field-border-radius);
	padding: calc(#{(util.calculate-size(10))}) calc(#{(util.calculate-size(16))});
	font-weight: 500;
	font-size: calc(#{(util.calculate-size(16))});
	line-height: 150%;
	appearance: none;
	//width: 100%;
	outline: none;
	transition: color 200ms ease-in-out, border 200ms ease-in-out;
	display: grid;
	align-items: center;
	grid-template-columns: auto calc(#{(util.calculate-size(16))});

	&__angle {
		position: absolute;
		width: calc(#{(util.calculate-size(16))});
		height: calc(#{(util.calculate-size(16))});
		right: calc(#{(util.calculate-size(16))});
		top: 50%;
		transform: translateY(-50%);
	}

	&__select {
		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		cursor: pointer;
	}

	#{$self}__placeholder,
	#{$self}__value {
		height: calc(#{(util.calculate-size(24))});
		font-family: inherit;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	#{$self}__placeholder {
		color: var(--kuku--text-field-placeholder);
	}
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
	-webkit-box-shadow: 0 0 0 1000px var(--kuku--text-field-background) inset !important;
}
</style>
