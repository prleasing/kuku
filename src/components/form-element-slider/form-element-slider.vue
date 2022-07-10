<template>
	<div :class="classes">
		<form-element v-bind="$attrs" :label="label" :error="error" @click-label="clickFromLabel">
			<template #default="slotProps">
				<slot v-bind="slotProps" />
			</template>
		</form-element>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PropsFormElement, FormElement } from '../form-element';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('form-element-slider');

export default defineComponent({
	name,
	components: { FormElement },
	inheritAttrs: false,
	props: { ...PropsFormElement },
	setup(_, { emit }) {
		const classes = useClasses(bem, () => [], {
			prefix: false
		});

		function clickFromLabel() {
			emit('click-label');
		}
		return { clickFromLabel, classes };
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
.kuku-form-element-slider {
	padding-bottom: calc(#{(util.calculate-size(23))});
}
</style>
