<template>
	<div :class="classes">
		<!--	eslint-disable-next-line vuejs-accessibility/label-has-for -->
		<label :for="id">
			<slot />
		</label>
		<input :id="id" v-model="checked" type="checkbox" />
		<span>
			<icon :width="16" name="check-mark" />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { generateId } from '@prleasing/utility';
import { Icon } from '../icon';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('checkbox-field');

export default defineComponent({
	name,
	components: { Icon },
	props: {
		id: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return generateId(name);
			}
		},
		modelValue: {
			type: [Boolean] as PropType<boolean>,
			required: false,
			default(this: void) {
				return false;
			}
		}
	},
	setup(props, { emit }) {
		const checked = ref(props.modelValue);

		watch(
			() => props.modelValue,
			() => {
				checked.value = props.modelValue;
			}
		);
		watch(checked, (value) => {
			emit('update:modelValue', value);
		});

		const classes = useClasses(bem, () => bem({ checked: checked.value }));

		return { checked, classes };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-checkbox-field {
	--checkbox-field-size: calc(#{(util.calculate-size(24))});
	--checkbox-field-icon-size: calc(#{(util.calculate-size(16))});
	--checkbox-radius: calc(#{(util.calculate-size(8))});
	display: inline-flex;
	font-size: calc(#{(util.calculate-size(12))});
	line-height: 140%;
	color: var(--kuku--checkbox-field-color);
	position: relative;
	transition: opacity 200ms ease-in-out;
	font-weight: 500;
	& > label {
		margin-top: calc(#{(util.calculate-size(3))});
		order: 2;
		cursor: pointer;
	}

	& > span {
		width: var(--size);
		//height: calc(#{(util.calculate-size(24))});
		aspect-ratio: 1 / 1;
		display: block;
		padding: calc(#{(util.calculate-size(4))});
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		color: var(--kuku--checkbox-field-mark-color);
		transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
		opacity: 0;
		transform: scale(0);
		.kuku-icon {
			width: var(--checkbox-field-icon-size);
			height: var(--checkbox-field-icon-size);
		}
	}

	& > input[type='checkbox'] {
		order: 1;
		width: var(--checkbox-field-size);
		height: var(--checkbox-field-size);
		aspect-ratio: 1 / 1;
		padding: 0;
		cursor: pointer;
		appearance: none;
		background-color: var(--kuku--checkbox-field-background);
		border: 1px solid var(--kuku--checkbox-field-background);
		border-radius: var(--checkbox-radius);
		outline: none;
		transition: background 200ms ease-in-out, border 200ms ease-in-out;
		margin: 0 calc(#{(util.calculate-size(8))}) 0 0;

		@media (hover: hover) {
			&:focus,
			&:hover {
				border-color: var(--kuku--checkbox-field-border);
				background-color: transparent;
			}
		}

		&:checked {
			background-color: var(--kuku--checkbox-field-mark);
			border-color: var(--kuku--checkbox-field-mark);
			@media (hover: hover) {
				&:focus,
				&:hover {
					background-color: var(--kuku--checkbox-field-mark--isFocus);
					border: var(--kuku--checkbox-field-mark--isFocus);
				}
			}
		}
	}
	&--checked {
		& > span {
			opacity: 1;
			transform: scale(1);
		}
	}
}
</style>
