<template>
	<div ref="element" v-bind="$attrs" :class="classes">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useRef } from '@prleasing/use';
import type { Interactable } from '@interactjs/types';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const interactAsync = () => import(/* webpackChunkName: "interactjs" */ 'interactjs');

const [name, bem] = createNamespace('touche-drag');

export default defineComponent({
	name,
	inheritAttrs: false,
	emits: ['dragStart', 'dragMove', 'dragEnd'],
	setup(_, { emit }) {
		const $element = useRef<HTMLElement>();
		let interactInstance: null | Interactable = null;

		function onStart(event: any) {
			emit('dragStart', event);
		}
		function onMove(event: any) {
			emit('dragMove', event);
		}
		function onEnd(event: any) {
			emit('dragEnd', event);
		}

		async function setInteract($el: HTMLElement) {
			const { default: interact } = await interactAsync();

			interactInstance = interact($el)
				.draggable({
					startAxis: 'y',
					lockAxis: 'y',
					onstart: onStart,
					onmove: onMove,
					onend: onEnd
				})
				.styleCursor(false);
		}

		onMounted(async () => {
			await nextTick();
			if ($element.value && !interactInstance) {
				setInteract($element.value).then();
			}
		});

		onBeforeUnmount(() => {
			if (interactInstance) {
				interactInstance.unset();
				interactInstance = null;
			}
		});

		const classes = useClasses(bem);

		return { classes, element: $element };
	}
});
</script>

<style lang="scss"></style>
