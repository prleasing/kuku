<template>
	<span :class="classes"><slot /></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('error-text');

export default defineComponent({
	name,
	setup() {
		const classes = useClasses(bem);

		return { classes };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-error-text {
	font-weight: 500;
	font-size: calc(#{(util.calculate-size(12))});
	line-height: 140%;
	margin-top: calc(#{(util.calculate-size(8))});
	display: inline-block;
	color: var(--secondary-brand-color);
}
</style>
