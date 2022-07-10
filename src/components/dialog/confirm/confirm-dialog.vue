<template>
	<modal-card v-model="active" :class="classes">
		<div :class="bem('content')">
			<p v-if="text">{{ text }}</p>
			<slot v-else />
		</div>
		<div :class="bem('footer')">
			<btn data-type="confirm" @click="confirm">{{ textConfirm }}</btn>
			<btn data-type="cancel" @click="cancel">{{ textCancel }}</btn>
		</div>
	</modal-card>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, PropType } from 'vue';
import { generateId } from '@prleasing/utility';
import { DialogType } from '../types';
import { register, unregister } from '../collection';
import { ModalCard } from '../../modal-card';
import { Btn } from '../../button';
import { createNamespace } from '../../../util';
import { useClasses, useModal } from '../../../composables';

const [name, bem] = createNamespace('confirm-dialog');

export default defineComponent({
	name,
	components: { ModalCard, Btn },
	props: {
		id: {
			type: String as PropType<string>,
			required: true,
			default(this: void) {
				return generateId(name);
			}
		},
		text: {
			type: String as PropType<string>,
			required: false,
			default: null
		},
		textConfirm: {
			type: String as PropType<string>,
			required: false,
			default: 'Да'
		},
		textCancel: {
			type: String as PropType<string>,
			required: false,
			default: 'отмена'
		}
	},
	setup(props) {
		const { active, open, close } = useModal();

		let resolveDialog: (value: boolean | PromiseLike<boolean>) => void;

		function openDialog() {
			open();
			return new Promise<boolean>((resolve) => {
				resolveDialog = resolve;
			});
		}
		register(DialogType.Confirm, props.id, openDialog);

		function confirm() {
			resolveDialog(true);
			close();
		}
		function cancel() {
			resolveDialog(false);
			close();
		}

		onBeforeUnmount(() => {
			unregister(props.id);
		});

		const classes = useClasses(bem);

		return { active, confirm, cancel, classes, bem };
	}
});
</script>

<style lang="scss">
@use '../../../assets/style/button';
@use '../../../assets/style/util';
.kuku-confirm-dialog {
	&__content {
		font-weight: 500;
		font-size: calc(#{(util.calculate-size(18))});
		line-height: 150%;
		margin-bottom: calc(#{(util.calculate-size(16))});
	}
	&__footer {
		display: flex;
		button {
			flex: 0 0 auto;
		}
		button + button {
			margin-left: calc(#{(util.calculate-size(10))});
		}
		button[data-type='confirm'] {
			flex: 1;
			@include button.brand;
		}
	}
}
</style>
