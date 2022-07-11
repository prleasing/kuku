<template>
	<teleport to="body">
		<overlay v-show="show" ref="overlay" :style="{ zIndex: zIndex }" @click="close" />
		<transition name="popup-down">
			<div v-if="active" v-show="show" ref="el" :class="classes" :style="{ zIndex: zIndex + 1 }" v-bind="$attrs">
				<slot />
			</div>
		</transition>
	</teleport>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useModel, useRef, useState } from '@prleasing/use';
import { Overlay } from '../overlay';
import { useOverlay } from '../../composables/overlay';
import { useClasses } from '../../composables';
import { stack } from './stack';
import { PropsModal } from './props';
import { name, bem } from './namespace';

export default defineComponent({
	name,
	components: { Overlay },
	inheritAttrs: false,
	expose: ['el', 'open', 'close'],
	props: PropsModal,
	emits: ['update:modelValue', 'onClose'],
	setup(props, { emit }) {
		const overlay = useOverlay();
		const [show] = useState(false);
		const { modelValue: active, updateModel } = useModel<boolean>();
		const zIndex = ref(props.zIndexBase);

		watch(
			() => props.zIndexBase,
			(value) => {
				zIndex.value = value;
			}
		);

		function open() {
			active.value = true;
			updateModel();
			props.beforeOpen('open');
		}
		const $el = useRef<HTMLElement>();

		onMounted(() => {
			if (active.value) {
				open();
				addStack();
				render();
			}
		});
		const opened = computed(() => active.value);

		function addStack() {
			const item = reactive({
				id: props.id,
				show,
				overlay
			});

			overlay.value?.show();
			stack.value.push(item as any);
		}
		function removeStack(id: string) {
			const item = stack.value.find((item) => item.id === id);

			if (item) {
				item.show = false;
				item.overlay.hide();
			}
			stack.value = stack.value.filter((item) => item.id !== id);
			active.value = false;
			updateModel();
		}
		function close() {
			removeStack(props.id);
			emit('onClose');
		}

		const lastModal = computed(() => stack.value[stack.value.length - 1]);

		function render() {
			if (stack.value.length > 0) {
				stack.value.forEach((item) => {
					item.show = false;
					zIndex.value = props.zIndexBase;
				});
				if (lastModal.value) {
					lastModal.value.show = true;
					lastModal.value.overlay?.opacityChange(props.opacity.value, props.opacity.animate);
				}
			}
		}

		watch(active, (value) => {
			if (value) {
				addStack();
			} else {
				close();
			}
			render();
		});
		const classes = useClasses(bem);
		const classContent = bem('content');

		watch(show, (value) => {
			document.body.classList.toggle('kuku-modal-opened', value);
		});

		watch(
			() => props.opacity.value,
			(value) => {
				overlay.value?.opacityChange(value, props.opacity.animate);
			}
		);
		watch(
			() => props.opacity.animate,
			(animate) => {
				overlay.value?.opacityChange(props.opacity.value, animate);
			}
		);
		onBeforeUnmount(() => {
			close();
		});

		return {
			el: $el,
			classes,
			classContent,
			zIndex,
			overlay,
			active,
			open,
			close,
			show,
			opened
		};
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';

.kuku-modal {
	z-index: 150;
	position: fixed;
	opacity: 1;
	top: 0;
	width: 100%;
	bottom: 0;
	left: 50%;
	pointer-events: none;
	overflow: hidden;
	transform: translate3d(-50%, 0%, 0);

	////&.active {
	////	bottom: 16px;
	////	left: calc(50%);
	////	transform: translateX(-50%);
	////	z-index: 100;
	////	display: inline-block;
	////	visibility: visible;
	////	pointer-events: auto;
	////}
	//
	////&.show {
	////	transform: translateY(0) translateX(-50%);
	////	opacity: 100%;
	////}
	//
	//&.active.show.closed {
	//	transform: translateY(200%) translateX(-50%);
	//	//opacity: 0;
	//}
}

.popup-down-enter-active,
.popup-down-leave-active {
	transition: all 0.6s cubic-bezier(0.42, 0, 0.19, 1);
	-webkit-transition: all 0.6s cubic-bezier(0.42, 0, 0.19, 1);
}

.popup-down-enter-from,
.popup-down-leave-to {
	//transform: translate3d(200%, -50%, 0);
	transform: translate3d(-50%, 200%, 0) !important;
}

html.overflow-hidden {
	height: 100vh;
	//position: fixed;
	overflow: hidden;
	body {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
		inset: 0;
		text-size-adjust: 100%;
	}

	#app {
		position: relative;
		top: var(--overlay-scroll-position);
	}
}
</style>
