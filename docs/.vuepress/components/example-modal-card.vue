<template>
	<btn @click="open" brand>Открыть модальное окно</btn>
	<modal-card v-model="active">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa earum excepturi illum iure perspiciatis, porro
		ratione. Aut cumque est magni perspiciatis quaerat quidem, quis quod recusandae reiciendis rem repudiandae
		voluptatibus.

		<div>
			<btn style-button="secondary" @click="close">закрыть</btn>
		</div>
	</modal-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ModalCard, useModal, Btn } from '@prleasing/kuku';
export default defineComponent({
	components: { ModalCard, Btn },
	setup() {
		const { active, open, close } = useModal();
		return { active, open, close };
	}
});
</script>
