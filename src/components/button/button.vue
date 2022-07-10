<template>
	<component :is="tag" v-bind="$attrs" ref="el" :class="classes" :disabled="disabled">
		<icon v-if="icon" :name="icon" :width="20" />
		<slot>Клац</slot></component
	>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRef } from '@prleasing/use';
import { Icon } from '../icon';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('button');

export default defineComponent({
	name,
	components: { Icon },
	inheritAttrs: false,
	expose: ['$el'],
	props: {
		tag: {
			type: String as PropType<'button' | 'a' | 'router-link'>,
			default: 'button'
		},
		icon: {
			type: String as PropType<string>,
			default: null
		},
		styleButton: {
			type: String as PropType<'secondary'>,
			default: 'base'
		},
		reset: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		block: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		brand: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false
		}
	},
	setup(props, { expose }) {
		const $el = useRef<HTMLElement>();
		const classes = useClasses(bem, () => {
			if (props.reset !== true) {
				return bem({
					block: props.block,
					brand: props.brand,
					disabled: props.disabled
				}).concat(bem([props.styleButton]));
			}
			return [];
		});

		expose({ $el });

		return { classes, el: $el };
	}
});
</script>
<style lang="scss">
@use '../../assets/style/util';
@use '../../assets/style/button';

.kuku-button {
	$self: &;
	cursor: pointer;
	@include button.reset;
	.kuku-icon {
		color: var(--kuku--button-icon);
		margin-right: calc(#{(util.calculate-size(10))});
	}
	&--base {
		@include button.base;
	}
	&--block {
		display: flex;
		width: 100%;
	}
	&--brand {
		@include button.base;
		@include button.brand;
	}
	&--secondary {
		@include button.base;
		background: #f8f8fa;
		border-color: #f8f8fa;
	}
	&:disabled,
	&--disabled {
		pointer-events: none;
		opacity: 0.5;
	}
}
</style>
