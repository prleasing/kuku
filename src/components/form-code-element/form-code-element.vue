<template>
	<div :class="classes">
		<div class="kuku-form-code-element__label">{{ label }}</div>
		<slot />
		<error-text v-if="error">{{ error }}</error-text>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRef } from '@prleasing/use';
import { ErrorText } from '../error-text';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('form-code-element');

export default defineComponent({
	name,
	components: { ErrorText },
	props: {
		label: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return '';
			}
		},
		error: {
			type: String as PropType<string | null>,
			required: false,
			default(this: void) {
				return null;
			}
		}
	},

	setup(props) {
		const $el = useRef();

		const classes = useClasses(bem, () =>
			bem({
				error: !!props.error
			})
		);

		return { element: $el, classes };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-form-code-element {
	$self: &;
	display: grid;
	justify-items: center;
	gap: calc(#{(util.calculate-size(8))});
	&__label {
		font-size: calc(#{(util.calculate-size(18))});
		line-height: 120%;
		color: #2ab37b;
		margin-bottom: calc(#{(util.calculate-size(8))});
	}
	&#{$self}--error {
		.kuku-code-field > input:not(:focus) {
			background-color: #ffffff;
			border-color: currentColor;
			color: var(--secondary-brand-color);
		}
	}
}
</style>
