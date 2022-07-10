<template>
	<transition name="kuku-transition-overlay">
		<div v-if="state.show" :class="classes" :style="{ opacity: state.opacity }" v-bind="$attrs" />
	</transition>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useBodyOverflow } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('overlay');

export default defineComponent({
	name,
	inheritAttrs: false,
	setup(_, { expose }) {
		const state = reactive({
			show: false,
			opacity: 1
		});

		const overflow = useBodyOverflow();
		const change = ref(false);

		function show(opacity = 1) {
			state.opacity = opacity;
			overflow.disabled();
			state.show = true;
		}
		function hide() {
			overflow.active();
			state.show = false;
		}
		function opacityChange(opacity = 1, animate = false) {
			if (animate) {
				change.value = true;
			}
			state.opacity = opacity;

			if (animate) {
				setTimeout(() => {
					change.value = false;
				}, 400);
			}
		}
		const classes = useClasses(bem, () =>
			bem({
				change: change.value
			})
		);

		expose({
			showed: state.show,
			show,
			hide,
			opacityChange
		});
		return { classes, state, show, hide, opacityChange, showed: state };
	}
});
</script>

<style lang="scss">
.kuku-overlay {
	background-color: rgba(#98a1b7, 0.9);
	backdrop-filter: blur(5px);
	pointer-events: auto;
	position: fixed;
	left: 0;
	top: -100px;
	bottom: calc(env(safe-area-inset-bottom) * -1);
	right: 0;
	opacity: 1;
	&--change {
		transition: opacity 0.4s cubic-bezier(0.42, 0, 0.19, 1);
	}
}
.kuku-transition-overlay-enter-active,
.kuku-transition-overlay-leave-active {
	transition: opacity 0.4s cubic-bezier(0.42, 0, 0.19, 1);
}

.kuku-transition-overlay-enter-from,
.kuku-transition-overlay-leave-to {
	opacity: 0 !important;
}
</style>
