<template>
	<tabs-base v-model="active" :classes="classes" :list-classes="listClasses"><slot /></tabs-base>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { nope } from '@prleasing/utility';
import { useModel } from '@prleasing/use';
import { propsTabsBase, TabsBase } from '../tabs-base';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('tabs');

export default defineComponent({
	name,
	components: { TabsBase },
	props: propsTabsBase,
	setup() {
		const { modelValue: active } = useModel();
		const classes = useClasses(bem, nope);

		const listClasses = bem('list');

		return { classes, listClasses, active };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-tabs {
	margin: calc(#{(util.calculate-size(16))}) 0;
	&__list {
		padding: 0;
		margin: 0;
		display: flex;
		list-style: none;
		flex-wrap: wrap;
		gap: calc(#{(util.calculate-size(8))});
	}
}
</style>
