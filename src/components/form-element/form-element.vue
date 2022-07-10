<template>
	<div ref="element" :class="classes">
		<text-field-label :id="id" @click="clickFromLabel">
			{{ label }}
		</text-field-label>
		<slot :id="id" v-bind="handleFocus"></slot>
		<error-text v-if="error">{{ error }}</error-text>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useOnFocus, useRef } from '@prleasing/use';
import { TextFieldLabel } from '../text-field-label';
import { ErrorText } from '../error-text';
import { useClasses } from '../../composables';
import { PropsFormElement } from './props';
import { name, bem } from './namespace';

export default defineComponent({
	name,
	components: { ErrorText, TextFieldLabel },
	props: {
		...PropsFormElement
	},
	emits: ['click-label', 'focus', 'blur'],

	setup(props, { emit }) {
		const $el = useRef<HTMLElement>();
		const { isFocus, ...handleFocus } = useOnFocus();

		const classes = useClasses(bem, () =>
			bem({
				focus: isFocus.value,
				error: !!props.error
			})
		);

		function clickFromLabel() {
			emit('click-label');
		}

		return { clickFromLabel, element: $el, isFocus, classes, handleFocus };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-form-element {
	$self: &;
	position: relative;

	min-height: calc(#{(util.calculate-size(58))});
	> .kuku-text-field-label {
		> span {
			z-index: 1;
			position: absolute;
			top: calc(#{(util.calculate-size(8))});
			left: calc(#{(util.calculate-size(16))});
			display: inline-block;
		}
	}
	> .kuku-security-field .kuku-text-field,
	> .kuku-text-field,
	> .kuku-select-field,
	> .kuku-slider-field {
		padding-top: calc(#{(util.calculate-size(24))});
		border-radius: var(--text-field-border-radius) var(--text-field-border-radius) 0 0;
		border-bottom: 1px solid var(--kuku--form-element-border);
	}

	@media (hover: hover) {
		&:hover {
			> .kuku-security-field .kuku-text-field,
			> .kuku-text-field,
			> .kuku-select-field,
			> .kuku-slider-field {
				color: var(--kuku--form-element-color--focus);
			}
		}
	}

	&#{$self}--error {
		> .kuku-text-field-label {
			color: var(--secondary-brand-color);
		}
		> .kuku-security-field .kuku-text-field,
		> .kuku-text-field,
		> .kuku-select-field,
		> .kuku-slider-field {
			border-color: var(--secondary-brand-color);
		}
	}

	&#{$self}--focus {
		> .kuku-text-field-label {
			color: var(--kuku--form-element-color--focus);
		}
		> .kuku-security-field .kuku-text-field,
		> .kuku-text-field,
		> .kuku-select-field,
		> .kuku-slider-field {
			outline-color: transparent;
			border-bottom-color: var(--kuku--form-element-color--focus);
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
	opacity: 0;
}
</style>
