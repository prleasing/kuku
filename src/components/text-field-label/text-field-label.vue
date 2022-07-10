<template>
	<!--	eslint-disable-next-line vuejs-accessibility/label-has-for,vuejs-accessibility/click-events-have-key-events -->
	<label :class="classes" :for="id" @click="click">
		<span><slot /></span>
		<slot :id="id" name="input" />
	</label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { EmptyFunction, generateId } from '@prleasing/utility';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('text-field-label');

export default defineComponent({
	name,
	props: {
		id: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return generateId(name);
			}
		},
		onClick: {
			type: Function as PropType<EmptyFunction>,
			default(this: void) {
				console.log(1);
			}
		}
	},
	setup(_, { emit }) {
		const classes = useClasses(bem);

		function click() {
			emit('click');
		}
		return { click, classes };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';

.kuku-text-field-label {
	font-weight: 500;
	font-size: 1 calc(#{(util.calculate-size(12))});
	line-height: 150%;
	color: var(--kuku--text-field-label-color);
	cursor: pointer;
	transition: color 200ms ease-in-out;
}
</style>
