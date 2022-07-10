<template>
	<tab-base-item :to="to" :key-tab="keyTab" :class="classes" :tag="tag" v-bind="$attrs"><slot /></tab-base-item>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { provideKey } from '../tabs-base';
import { propsTabBaseItem, TabBaseItem } from '../tab-base-item';
import { createNamespace } from '../../util';

const [name, bem] = createNamespace('tab-item');

export default defineComponent({
	name,
	components: { TabBaseItem },
	inheritAttrs: false,
	props: { ...propsTabBaseItem },
	setup(props) {
		const active = inject(provideKey);
		const classes = computed(() => [bem(), ...bem({ active: active?.value === props.keyTab })]);

		return { active, classes };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
@use '../../assets/style/button';
.kuku-tab-item {
	padding: 0;
	margin: 0;
	height: calc(#{(util.calculate-size(38))});
	.tab-base-item__title {
		@include button.reset;
		font-size: calc(#{(util.calculate-size(14))});
		line-height: 140%;
		color: #403e4b;
		padding: 0 calc(#{(util.calculate-size(16))});
		text-align: center;
		height: 100%;
		display: flex;
		white-space: nowrap;
		border: 1px solid #efeff3;
		border-radius: calc(#{(util.calculate-size(8))});
		background-color: #ffffff;
		justify-content: center;
		align-items: center;
		transition: border 200ms ease-in-out, color 200ms ease-in-out, background-color 200ms ease-in-out;
		&:hover {
			text-decoration: none;
		}
		@media (hover: hover) {
			&:hover {
				border-color: #ffffff;
			}
		}
	}
	&--active {
		.tab-base-item__title {
			background: #403e4b;
			color: #ffffff;
			border-color: rgba(42, 179, 123, 0.08);
		}
	}
}
</style>
