<template>
	<div :class="classes">
		<div :class="bem('icon')">
			<icon :width="44" :name="iconName" />
		</div>

		<details ref="details" @toggle="toggle">
			<summary :class="bem('summary')">{{ summary }}</summary>
			<div :class="bem('content')">
				<slot />
			</div>
		</details>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, PropType } from 'vue';
import { useRef, useToggle } from '@prleasing/use';
import { Icon } from '../icon';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('detail');

export default defineComponent({
	name,
	components: { Icon },
	props: {
		summary: {
			type: String as PropType<string>,
			required: true
		}
	},
	setup() {
		const details = useRef<HTMLDetailsElement>();
		const [open, toggle] = useToggle(false);
		const classes = useClasses(bem, () =>
			bem({
				open: open.value
			})
		);

		const iconName = computed(() => (open.value ? 'minus' : 'plus'));

		onMounted(() => {
			nextTick().then(() => {
				open.value = details.value?.open ?? false;
			});
		});
		return { iconName, classes, bem, toggle, details };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';

.kuku-detail > summary {
	list-style: none;
}

:root {
	--kuku-detail-font-size: calc(#{util.calculate-size(18)});
	--kuku-detail-font-color: #646472;
	--kuku-detail-padding: calc(#{util.calculate-size(23)});
	--kuku-detail-summary-padding: calc(#{util.calculate-size(20)});
	--kuku-detail-summary-color: #403e4b;
	--kuku-detail-summary-font-size: calc(#{util.calculate-size(20)});
	--kuku-detail-icon-size: calc(#{util.calculate-size(44)});
	--kuku-detail-icon-size-top: calc(#{util.calculate-size(16)});
	--kuku-detail-icon-color: #2ab37b;
	--kuku-detail-icon-color--close: #ee5c5c;
}

.kuku-detail {
	$self: &;
	//border-top: 1px solid rgba(100, 100, 114, 0.16);
	appearance: none;
	font-weight: 500;
	font-size: var(--kuku-detail-font-size);
	line-height: 150%;
	color: var(--kuku-detail-font-color);
	padding: 0;
	position: relative;
	&__icon {
		pointer-events: none;
		position: absolute;
		width: var(--kuku-detail-icon-size);
		height: var(--kuku-detail-icon-size);
		right: 0;
		top: var(--kuku-detail-icon-size-top);
		color: var(--kuku-detail-icon-color);
		.kuku-icon {
			transition: color 200ms ease-in-out;
			--kuku--icon-width: var(--kuku-detail-icon-size) !important;
			--kuku--icon-height: var(--kuku-detail-icon-size) !important;
			display: block;
		}
	}

	&__summary {
		list-style: none;
		font-weight: 500;
		padding: var(--kuku-detail-padding) 0;
		line-height: 150%;
		font-size: var(--kuku-detail-summary-font-size);
		color: var(--kuku-detail-summary-color);
		appearance: none;
		cursor: pointer;

		::-webkit-details-marker {
			display: none;
		}

		&::before {
			display: none;
		}
	}

	&[open] {
	}
	&#{$self}--open {
		padding: 0 0 var(--kuku-detail-padding);
		--kuku-detail-icon-color: var(--kuku-detail-icon-color--close);
		font-weight: 600;
		#{$self}__summary {
			font-weight: 600;
		}
	}
}
</style>
