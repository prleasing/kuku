<template>
	<div :class="classes">
		<div ref="scroll" :class="bem('scroll')">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue';
import { useEventListener, useMutationObserver, useRef } from '@prleasing/use';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('vertical-scroll');

export default defineComponent({
	name,
	setup() {
		const wrap = useRef<HTMLElement>();
		const scroll = useRef<HTMLElement>();
		const isLeft = ref(false);
		const isRight = ref(false);

		function getHeightScroll(): number {
			return scroll.value?.clientHeight ?? 0;
		}

		const classes = useClasses(bem, () =>
			bem({
				isLeft: isLeft.value,
				isRight: isRight.value
			})
		);

		function onScroll(): void {
			if (scroll.value !== null) {
				isLeft.value = scroll.value.scrollTop > 0;
				isRight.value = scroll.value.scrollTop + getHeightScroll() < scroll.value.scrollHeight;
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
.kuku-vertical-scroll {
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
		//display: flex;
		//flex-direction: column;
		overflow-y: auto;
		height: 100%;
		&::-webkit-scrollbar {
			display: none;
		}
	}
}

.kuku-vertical-scroll--is-right {
	//background-size: calc(#{(util.calculate-size(56))}) calc(#{(util.calculate-size(56))});
	-webkit-mask-image: linear-gradient(0deg, transparent 0, black calc(#{(util.calculate-size(56))}));
	mask-image: linear-gradient(0deg, transparent 0, black calc(#{(util.calculate-size(56))}));
}
.kuku-vertical-scroll--is-left {
	-webkit-mask-image: linear-gradient(180deg, transparent 0, black calc(#{(util.calculate-size(56))}));
	mask-image: linear-gradient(180deg, transparent 0, black calc(#{(util.calculate-size(56))}));
}
.kuku-vertical-scroll--is-right.kuku-vertical-scroll--is-left {
	mask-image: linear-gradient(
		0deg,
		transparent 0,
		black calc(#{(util.calculate-size(56))}),
		black calc(100% - calc(#{(util.calculate-size(56))})),
		transparent 100%
	);
	-webkit-mask-image: linear-gradient(
		0deg,
		transparent 0,
		black calc(#{(util.calculate-size(56))}),
		black calc(100% - calc(#{(util.calculate-size(56))})),
		transparent 100%
	);
}
</style>
