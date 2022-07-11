<template>
	<modal ref="modal" v-model="modelValue" :z-index-base="3000" :opacity="opacity">
		<div :class="classes" :style="{ transform: `translate(-50%, ${translateY}px)` }">
			<touche-drag @drag-move="dragMove" @drag-end="dragEnd" @drag-start="resetDrag">
				<slot />
			</touche-drag>
		</div>
	</modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { clamp, rubber } from '@prleasing/utility';
import { useExpose, useModel } from '@prleasing/use';
import { ToucheDrag } from '../touche-drag';
import { Modal } from '../modal';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('modal-card');

export default defineComponent({
	name,
	components: { Modal, ToucheDrag },
	expose: ['open', 'close'],
	setup() {
		const { modelValue } = useModel<boolean>();
		const modal = useExpose(Modal);

		const opacity = reactive({
			value: 1,
			animate: false
		});
		const position = { y: 0 };
		const translateY = ref(0);

		function updateTransform(y: number) {
			translateY.value = y;
		}

		function opacityChange(value: number) {
			opacity.value = clamp(0, value, 1);
		}
		function dragMove(event: any) {
			requestAnimationFrame(() => {
				position.y += event.dy;
				if (position.y <= 0) {
					updateTransform(0);

					opacityChange(1);
				} else {
					const top = rubber(position.y, 100, 0.8);

					updateTransform(top);
					const offset = 100;

					opacityChange(1 - position.y / offset);
				}
			});
		}
		function dragEnd() {
			if (position.y > 0 && rubber(position.y, 100, 0.8) >= 100 * 0.5) {
				modelValue.value = false;
			} else {
				opacityChange(1);
				position.y = 0;
				updateTransform(0);
			}
		}
		const classes = useClasses(bem, () => [], {
			prefix: false
		});

		watch(modelValue, () => {
			if (modelValue.value) {
				updateTransform(0);
				opacityChange(1);
			}
		});
		function resetDrag() {
			position.y = 0;
		}
		return { modelValue, resetDrag, classes, modal, dragMove, dragEnd, opacity, translateY };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-modal-card {
	border-radius: calc(#{(util.calculate-size(16))});
	width: calc(100% - var(--ears, 0px) * 2);
	pointer-events: auto;
	//max-width: 600px;
	max-width: calc(var(--container, 600px) - var(--ears, 0px));
	overflow: auto;
	color: var(--primary-text-color);
	right: auto;
	background: #ffffff;
	box-shadow: 0 calc(#{(util.calculate-size(40))}) calc(#{(util.calculate-size(50))})
			calc(#{(util.calculate-size(-50))}) #2ab37b,
		0px calc(#{(util.calculate-size(40))}) calc(#{(util.calculate-size(100))}) calc(#{(util.calculate-size(-30))})
			rgba(64, 62, 75, 0.08);
	transform: translate3d(-50%, 0, 0);
	left: 50%;
	height: auto;
	padding: calc(#{(util.calculate-size(20))});
	max-height: max(calc(#{(util.calculate-size(250))}), 50vh);
	position: absolute;
	top: auto;
	bottom: calc(#{(util.calculate-size(20))});
}
</style>
