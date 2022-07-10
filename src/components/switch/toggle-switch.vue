<template>
	<label :for="id" :class="classes">
		<div :class="bem('indicator')" />
		<input :id="id" v-model="toggle" type="checkbox" class="sc-only" />
		<slot />
	</label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { generateId } from '@prleasing/utility';
import { useModel } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('toggle-switch');

export default defineComponent({
	name,
	props: {
		id: {
			type: String as PropType<string>,
			default(this: void) {
				return generateId(name);
			}
		},
		modelValue: {
			type: Boolean as PropType<boolean>,
			default: false
		}
	},
	setup() {
		const { modelValue: toggle } = useModel<boolean>();
		const classes = useClasses(bem, () =>
			bem({
				active: toggle.value
			})
		);

		return { classes, bem, toggle };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-toggle-switch {
	$self: &;
	display: inline-flex;
	font-style: normal;
	font-weight: 500;
	font-size: calc(#{(util.calculate-size(14))});
	line-height: calc(#{(util.calculate-size(19))});
	--kuku--toggle-switch-color: #2ab37b;
	color: var(--kuku--toggle-switch-color);
	cursor: pointer;
	align-items: center;
	white-space: nowrap;
	flex-wrap: nowrap;
	&__indicator {
		border-radius: calc(#{(util.calculate-size(100))});
		margin-right: calc(#{(util.calculate-size(8))});
		position: relative;
		background-color: #646472;
		width: calc(#{(util.calculate-size(34))});
		height: calc(#{(util.calculate-size(20))});
		transition: background-color 200ms ease-in-out;
		&:after {
			border-radius: calc(#{(util.calculate-size(100))});
			width: calc(#{(util.calculate-size(16))});
			height: calc(#{(util.calculate-size(16))});
			content: '';
			position: absolute;
			background-color: #ffffff;
			top: calc(#{(util.calculate-size(2))});
			left: calc(#{(util.calculate-size(2))});
			transition: left 200ms ease-in-out;
		}
	}
	&#{$self}--active {
		#{$self}__indicator {
			background-color: currentColor;
			&:after {
				left: calc(#{(util.calculate-size(16))});
			}
		}
	}
}
</style>
