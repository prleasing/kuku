<template>
	<div :class="classes">
		<text-field :id="id" v-model="secret" v-bind="$attrs" :type="show ? 'text' : 'password'" />
		<btn reset @click.prevent="toggle">
			<transition name="eye-fade" mode="out-in">
				<icon v-if="show" name="eye" :width="24" />
				<icon v-else name="eye-closed" :width="24" />
			</transition>
		</btn>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useModel } from '@prleasing/use';
import { TextField, propsTextField } from '../text-field';
import { Icon } from '../icon';
import { Btn } from '../button';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('security-field');

export default defineComponent({
	name,
	components: { TextField, Icon, Btn },
	inheritAttrs: false,
	props: propsTextField,
	setup(_, { emit }) {
		const { modelValue: secret } = useModel<string>();
		const show = ref(false);
		const classes = useClasses(bem);

		function toggle() {
			show.value = !show.value;
			emit('toggle-visible', show.value);
		}
		return { secret, show, toggle, classes };
	}
});
</script>

<style lang="scss" scoped>
@use '../../assets/style/util';
.kuku-security-field {
	$size: 24;
	$padding: 16;
	position: relative;
	--security-field-size: calc(#{(util.calculate-size($size))});
	--security-field-padding: calc(#{(util.calculate-size($padding))});

	& > .kuku-text-field {
		padding-right: calc(#{(util.calculate-size($padding * 2 + $size))});
		appearance: none;
	}
	& > .kuku-button {
		width: var(--security-field-size);
		height: var(--security-field-size);
		appearance: none;
		border: none;
		padding: 0;
		background: transparent;
		position: absolute;
		right: var(--security-field-padding);
		cursor: pointer;
		top: calc(50% - #{(util.calculate-size(12))});
		color: var(--text-field-color);
		.kuku-icon {
			width: var(--security-field-size);
			height: var(--security-field-size);
		}
	}
}
.eye-fade-enter-active,
.eye-fade-leave-active {
	transition: transform 0.2s ease-in-out;
}
.eye-fade-enter, .eye-fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
	transform: scale(1.1);
}
</style>
