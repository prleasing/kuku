<template>
	<modal :id="id" ref="modal" v-model="modelValue" :opacity="opacity">
		<div :class="classes">
			<div
				ref="modalContent"
				:class="bem('wrapper')"
				:style="{
					top: top + 'px',
					transform: `translate(0%, ${translateY}px)`
				}"
			>
				<component
					:is="component"
					:class="bem('gradable')"
					@drag-move="dragMove"
					@drag-end="dragEnd"
					@drag-start="resetDrag"
				>
					<div ref="content" :class="bem('content')">
						<touche-drag :class="bem('header')" @drag-move="dragMove" @drag-end="dragEnd" @drag-start="resetDrag" />
						<vertical-scroll :class="bem('scroller')" :height="200">
							<div :class="bem('body')">
								<slot />
							</div>
						</vertical-scroll>
					</div>
				</component>
			</div>
			<div ref="fullEmulatorTop" :class="bem('top-emulator')" />
			<div ref="cardEmulatorTop" :class="bem('card-top-emulator')" />
		</div>
	</modal>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { animationNumber, clamp, rubber } from '@prleasing/utility';
import { useModel, useRef, useResizeObserver, useToggle, useWindowResize } from '@prleasing/use';
import { VerticalScroll } from '../vertical-scroll';
import { ToucheDrag } from '../touche-drag';
import { Modal, PropsModal } from '../modal';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('modal-page');

export default defineComponent({
	name,
	components: { Modal, ToucheDrag, VerticalScroll },
	inheritAttrs: true,
	props: PropsModal,
	emits: ['update:modelValue'],
	setup() {
		const opacity = reactive({
			value: 1,
			animate: false
		});
		const translateY = ref(0);
		const top = ref(0);
		const { modelValue, updateModel } = useModel<boolean>();
		const modalContentWrapper = useRef<HTMLElement>();
		const content = useRef<HTMLElement>();
		const fullEmulatorTop = useRef<HTMLElement>();
		const cardEmulatorTop = useRef<HTMLElement>();
		const [isFullScreen] = useToggle(false);

		const position = { y: 0 };

		function resetDrag() {
			position.y = 0;
		}

		function getContains() {
			if (fullEmulatorTop.value) {
				const maxTop = fullEmulatorTop.value.getBoundingClientRect().height;
				const cardTop = window.innerHeight - getSizes().cardHeight;

				return { maxTop, cardTop };
			}
			return { maxTop: 0, cardTop: 0 };
		}
		function getSizes() {
			if (modalContentWrapper.value && cardEmulatorTop.value && content.value) {
				const wrapperHeight = modalContentWrapper.value.getBoundingClientRect().height;
				const contentHeight = content.value.getBoundingClientRect().height;
				const cardHeight = cardEmulatorTop.value.getBoundingClientRect().height;

				return {
					wrapperHeight,
					contentHeight,
					cardHeight
				};
			}
			return {
				cardHeight: 0,
				contentHeight: 0,
				wrapperHeight: 0
			};
		}
		function updateTopModalContentWrapper(value: number) {
			top.value = value;
		}
		function updateTranslateWrapper(y: number) {
			translateY.value = y;
		}

		function opacityChange(value: number, animate = false) {
			opacity.value = value;
			opacity.animate = animate;
		}

		function updateTop() {
			const { wrapperHeight, contentHeight, cardHeight } = getSizes();

			if (wrapperHeight >= cardHeight && !isFullScreen.value) {
				const offset = cardHeight > contentHeight ? cardHeight - contentHeight : 0;

				updateTopModalContentWrapper(window.innerHeight - cardHeight + offset);
			} else {
				const { maxTop } = getContains();

				updateTopModalContentWrapper(maxTop);
			}
		}

		if (typeof window !== 'undefined') {
			useWindowResize(updateTop);
		}

		// const resizeObserver = new ResizeObserver(() => {});

		useResizeObserver(modalContentWrapper, () => {
			updateTop();
		});

		watch(modelValue, updateModel);
		function dragMove(event: any) {
			const { maxTop, cardTop } = getContains();

			const { contentHeight, cardHeight } = getSizes();

			position.y += event.dy;

			let newTranslateY = position.y;

			if (isFullScreen.value) {
				requestAnimationFrame(() => {
					if (newTranslateY > cardTop) {
						updateTranslateWrapper(cardTop + rubber(newTranslateY - cardTop, window.innerHeight - cardTop, 1));
						opacityChange(clamp(0.5, 1 - (newTranslateY - cardTop / window.innerHeight - cardTop) / 100, 1));
						return;
					}
					opacityChange(1);

					updateTranslateWrapper(newTranslateY >= 0 ? newTranslateY : 0);
					if (newTranslateY < 0) {
						newTranslateY = 0;
					}
				});
			} else {
				window.requestAnimationFrame(() => {
					if (newTranslateY > 0) {
						updateTranslateWrapper(rubber(newTranslateY, 100, 1));
						const opacity = clamp(0.5, 1 - newTranslateY / cardTop, 1);

						opacityChange(opacity);
					} else if (contentHeight > cardHeight) {
						updateTranslateWrapper(
							Math.max(newTranslateY, window.innerHeight - (window.innerHeight - maxTop) - cardTop)
						);
						const offset = 1 - newTranslateY / cardTop;
						const opacity = clamp(0, offset, 1);

						opacityChange(opacity);
					}
				});
			}
		}

		function dragEnd() {
			const { maxTop, cardTop } = getContains();
			const { cardHeight, contentHeight } = getSizes();

			const saveTop = modalContentWrapper.value ? parseInt(modalContentWrapper.value.style.top, 10) : 0;
			let onStart = () => {
				opacityChange(1, true);
			};
			let onEnd = () => {
				position.y = 0;
				opacityChange(1);
			};

			if ((isFullScreen.value === false && position.y > 0) || (isFullScreen.value && position.y > cardTop)) {
				modelValue.value = false;
				return;
			}

			const offset = cardHeight > contentHeight ? cardHeight - contentHeight : 0;

			if (isFullScreen.value) {
				if (position.y > 0) {
					onEnd = () => {
						nextTick().then(() => {
							isFullScreen.value = false;
							updateTranslateWrapper(0);
							resetDrag();
							updateTop();
							opacityChange(1, true);
						});
					};
					onStart = () => {
						opacityChange(1, true);
					};
					animationNumber({
						duration: 200,
						from: Math.max(0, position.y),
						to: window.innerHeight - cardHeight - saveTop + offset,
						onFrame: updateTranslateWrapper,
						onEnd,
						onStart
					});
				}
			} else {
				const top = window.innerHeight + position.y - cardTop;

				if (maxTop <= top && position.y < 0) {
					if (offset > 0) {
						resetDrag();
						return;
					}
					onStart = () => {
						opacityChange(1, true);
					};
					onEnd = () => {
						nextTick().then(() => {
							isFullScreen.value = true;
							updateTranslateWrapper(0);
							updateTopModalContentWrapper(maxTop);
							resetDrag();
							opacityChange(1, false);
						});
					};
				} else if (offset > 0 && position.y < 0) {
					console.log(1);
					resetDrag();
					return;
				}

				animationNumber({
					duration: 200,
					from: Math.max(position.y, window.innerHeight - (window.innerHeight - maxTop) - cardTop),
					to: maxTop - saveTop,
					onStart,
					onFrame: updateTranslateWrapper,
					onEnd
				});
			}
		}

		onUpdated(() => {
			opacityChange(1, true);
			updateTop();
		});

		onMounted(async () => {
			await nextTick();
			position.y = 0;
			if (modalContentWrapper.value && cardEmulatorTop.value && fullEmulatorTop.value) {
				// resizeObserver.observe(modalContentWrapper.value);
				const $content = modalContentWrapper.value;

				$content.style.transform = `translate(0%, 0px)`;
			}
		});

		watch(modelValue, () => {
			translateY.value = 0;
			top.value = 0;
		});
		const classes = useClasses(
			bem,
			() =>
				bem({
					full: isFullScreen.value
				}),
			{
				prefix: false
			}
		);

		const component = computed(() => (!isFullScreen.value ? 'touche-drag' : 'div'));

		const translate = computed(() => {
			const y = translateY.value;

			return `translate(0%, ${y}px)`;
		});

		return {
			component,
			resetDrag,
			modelValue,
			content,
			fullEmulatorTop,
			cardEmulatorTop,
			modalContent: modalContentWrapper,
			classes,
			bem,
			dragMove,
			dragEnd,
			opacity,
			translateY,
			translate,
			top
		};
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';

:root {
	--kuku--modal-page-top--full: calc(#{(util.calculate-size(20))});
}

.kuku-modal-page {
	$self: &;
	--kuku--modal-page-top--full: calc(#{(util.calculate-size(20))});
	--kuku--modal-page-height-card: max(calc(#{(util.calculate-size(250))}), 50vh);
	--kuku--modal-page-top--card: calc(100vh - var(--kuku--modal-page-height-card));
	display: block;
	height: 100%;
	align-items: flex-end;
	overflow: hidden;
	pointer-events: none;
	&__wrapper {
		&:after {
			content: '';
			height: 200px;
			background: red;
			width: 100%;
			position: absolute;
			top: 100%;
		}
		pointer-events: auto;
		position: relative;
		margin: 0 auto;
		width: 100%;
		height: 100%;
		max-width: calc(var(--container));
		//overflow: hidden;
		color: var(--primary-text-color);
		background: #ffffff;
		box-shadow: 0 calc(#{(util.calculate-size(40))}) calc(#{(util.calculate-size(50))})
				calc(#{(util.calculate-size(-50))}) #2ab37b,
			0px calc(#{(util.calculate-size(40))}) calc(#{(util.calculate-size(100))}) calc(#{(util.calculate-size(-30))})
				rgba(64, 62, 75, 0.08);
		border-radius: calc(#{(util.calculate-size(16))}) calc(#{(util.calculate-size(16))}) 0 0;
		perspective: 1px;
		-webkit-mask-image: -webkit-radial-gradient(white, black);
	}

	&__gradable {
		overflow: hidden;
		height: 100%;
		cursor: move;
	}
	#{$self}__header {
		width: 100%;
		position: relative;
		display: block;
		top: 0;
		height: calc(#{(util.calculate-size(18))});
		background: rgba(255, 255, 255, 1);
		backdrop-filter: blur(5px);
		padding: calc(#{(util.calculate-size(18))}) calc(#{(util.calculate-size(18))}) 0;
		//border-bottom: 1px solid #efeff3;
		z-index: 1;
		border-radius: calc(#{(util.calculate-size(16))}) calc(#{(util.calculate-size(16))}) 0 0;
		overflow: hidden;
		perspective: 1px;
		pointer-events: auto;
		&:after {
			cursor: move;
			width: calc(#{(util.calculate-size(40))});
			height: calc(#{(util.calculate-size(2))});
			background: #403e4b;
			border-radius: 100px;
			content: '';
			position: absolute;
			left: calc(50% - #{(util.calculate-size(40))} / 2);
			top: calc(#{(util.calculate-size(8))});
		}
	}
	#{$self}__content {
		max-height: calc(100% - #{(util.calculate-size(18))});
		padding: 0 0 calc(var(--kuku--modal-page-padding-bottom, 0px) + #{(util.calculate-size(0))});
	}
	#{$self}__scroller {
		//overflow: hidden;
		//height: calc(100% - #{(util.calculate-size(18))});
		//flex: 0 1 calc(100% - #{(util.calculate-size(18))});
		//padding-bottom: calc(var(--kuku--modal-page-padding-bottom, 0px) + #{(util.calculate-size(18))});
	}
	#{$self}__body {
		position: relative;
		overflow: hidden;
		padding: 0 calc(#{(util.calculate-size(18))}) calc(#{(util.calculate-size(18))});

		//&:after {
		//	content: '';
		//	display: block;
		//	//height: calc(var(--kuku--modal-page-padding-bottom, 0px) + #{(util.calculate-size(18))});
		//}
	}
	&--full {
		height: 100%;
		display: block;
		#{$self}__wrapper {
			display: block;
			top: calc(#{(util.calculate-size(18))});
			height: 100%;
			overflow: hidden;
			#{$self}__content {
				display: flex;
				flex-direction: column;
				overflow: hidden;
				height: 100%;
			}
			#{$self}__scroller {
				overflow: hidden;
				flex: 0 1 100%;
				//height: calc(100vh - #{(util.calculate-size(18 * 2))});
			}

			#{$self}__body {
				height: auto;
				overflow: scroll;
			}
		}
	}

	&__top-emulator,
	&__card-top-emulator {
		z-index: -9999;
		pointer-events: none;
		opacity: 0;
		position: absolute;
	}

	&__top-emulator {
		height: calc(#{(util.calculate-size(18))});
	}

	&__card-top-emulator {
		height: var(--kuku--modal-page-height-card);
	}
}
</style>
