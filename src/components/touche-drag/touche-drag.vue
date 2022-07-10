<template>
	<div ref="element" v-bind="$attrs" :class="classes">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted } from 'vue';
import interact from 'interactjs';
import { useRef } from '@prleasing/use';
import { Interactable } from '@interactjs/types';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

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

		function setInteract($el: HTMLElement) {
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
				setInteract($element.value);
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
