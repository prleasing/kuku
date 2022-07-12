<template>
	<svg
		:class="classes"
		:width="size.width"
		:height="size.height"
		:style="{
			'--kuku--icon-width': size.width,
			'--kuku--icon-height': size.height
		}"
	>
		<use :xlink:href="`${symbolId}`" />
	</svg>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';
// eslint-disable-next-line import/no-unresolved

const [name, bem] = createNamespace('icon');

export default defineComponent({
	name,
	props: {
		name: {
			type: String as PropType<string>,
			default(this: void) {
				throw new Error('Нужно выбрать имя иконки');
			}
		},
		width: {
			type: Number as PropType<number>,
			required: false,
			default(this: void) {
				return null;
			}
		},
		height: {
			type: Number as PropType<number>,
			required: false,
			default(this: void) {
				return null;
			}
		}
	},
	setup(props) {
		const size = computed(() => {
			const width = props.width ?? 24;
			const height = props.height ?? width;

			return { width, height };
		});

		const classes = useClasses(bem, () => bem([props.name ?? '']));

		const version = computed(() => (process.env.NODE_ENV !== 'production' ? Math.random() : 1));

		const symbolId = computed(() => `#icon-${props.name}`);

		// eslint-disable-next-line import/no-unresolved
		import('virtual:svg-icons-register');
		return { symbolId, classes, size, version };
	}
});
</script>
<style lang="scss">
@use '../../assets/style/util';
.kuku-icon {
	display: inline-block;
	width: calc(#{util.calculate-size('var(--kuku--icon-width)')});
	height: calc(#{util.calculate-size('var(--kuku--icon-height)')});
	transition: color 100ms ease-in-out;
}
</style>
