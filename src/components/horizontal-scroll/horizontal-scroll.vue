<template>
	<div :class="classes">
		<div ref="wrap" :class="bem('wrap')">
			<div ref="scroll" :class="bem('scroll')">
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import { useEventListener, useMutationObserver, useRef } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('horizontal-scroll');

export default defineComponent({
	name,
	setup() {
		const wrap = useRef<HTMLElement>();
		const scroll = useRef<HTMLElement>();
		const isLeft = ref(false);
		const isRight = ref(false);

		function getWidthScroll(): number {
			return scroll.value?.clientWidth ?? 0;
		}

		const classes = useClasses(bem, () =>
			bem({
				isLeft: isLeft.value,
				isRight: isRight.value
			})
		);

		function onScroll(): void {
			if (scroll.value !== null) {
				isLeft.value = scroll.value.scrollLeft > 0;
				isRight.value = scroll.value.scrollLeft + getWidthScroll() < scroll.value.scrollWidth;
			}
		}

		useMutationObserver(scroll, onScroll);

		useEventListener(scroll, 'scroll', onScroll);

		onMounted(async () => {
			await nextTick();
			if (scroll.value !== null) {
				onScroll();
			}
		});
		return { classes, bem, wrap, scroll };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-horizontal-scroll {
	position: relative;
	display: block;
	transition: mask-image 200ms ease-in-out;
	&__wrap {
		position: relative;
		display: block;
		width: 100%;
		overflow: hidden;
	}

	&__scroll {
		display: flex;
		overflow-y: auto;

		&::-webkit-scrollbar {
			display: none;
		}
	}
}

.kuku-horizontal-scroll--is-right {
	//background-size: calc(#{(util.calculate-size(56))}) calc(#{(util.calculate-size(56))});
	-webkit-mask-image: linear-gradient(270deg, transparent 0, black calc(#{(util.calculate-size(56))}));
	mask-image: linear-gradient(270deg, transparent 0, black calc(#{(util.calculate-size(56))}));
}
.kuku-horizontal-scroll--is-left {
	-webkit-mask-image: linear-gradient(90deg, transparent 0, black calc(#{(util.calculate-size(56))}));
	mask-image: linear-gradient(90deg, transparent 0, black calc(#{(util.calculate-size(56))}));
}
.kuku-horizontal-scroll--is-right.kuku-horizontal-scroll--is-left {
	mask-image: linear-gradient(
		90deg,
		transparent 0,
		black calc(#{(util.calculate-size(56))}),
		black calc(100% - calc(#{(util.calculate-size(56))})),
		transparent 100%
	);
	-webkit-mask-image: linear-gradient(
		90deg,
		transparent 0,
		black calc(#{(util.calculate-size(56))}),
		black calc(100% - calc(#{(util.calculate-size(56))})),
		transparent 100%
	);
}
</style>
