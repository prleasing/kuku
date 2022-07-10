<template>
	<tab-base-item :to="to" :key-tab="keyTab" :class="classes"><slot /></tab-base-item>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { provideKey } from '../tabs-base';
import { TabBaseItem, propsTabBaseItem } from '../tab-base-item';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('line-tab-item');

export default defineComponent({
	name,
	components: { TabBaseItem },
	props: { ...propsTabBaseItem },
	setup(props) {
		const active = inject(provideKey);
		const classes = useClasses(bem, () => bem({ active: active?.value === props.keyTab }));

		return { active, classes };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-line-tab-item {
	padding: 0;
	margin: 0;
	> .tab-base-item__title {
		font-size: calc(#{(util.calculate-size(14))});
		line-height: 140%;
		color: #403e4b;
		padding: calc(#{(util.calculate-size(9))});
		text-align: center;
		display: block;
		transition: color 200ms ease-in-out;
		&:hover {
			text-decoration: none;
		}
	}
	&--active {
		.tab-base-item__title {
			color: #2ab37b;
		}
	}
}
</style>
