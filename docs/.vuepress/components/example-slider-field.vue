<template>
	<div class="example">
		<h4>Стандартный диапазон</h4>
		<slider-field v-model="year" :min="2000" :max="2030" />
	</div>
	<div class="example">
		<h4>Выбор из заранее определенного диапазона</h4>
		<slider-field v-model="cost" :values="items" />
	</div>
	<div class="example">
		<form-element-slider :label="`Факториал ${answer}?`" :error="error" @click-label="clickFromLabel">
			<template #default="slotProps">
				<slider-field ref="refCost" v-model="cost" :values="items" v-bind="slotProps" />
			</template>
		</form-element-slider>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Random } from '@prleasing/utility';
import { SliderField, FormElementSlider } from '@prleasing/kuku';

export default defineComponent({
	components: { SliderField, FormElementSlider },
	data() {
		return {
			refCost: null,
			year: 2022,
			cost: 0
		};
	},
	methods: {
		factorial(n) {
			return n != 1 ? n * this.factorial(n - 1) : 1;
		},

		clickFromLabel() {
			console.log(1);
			this.$refs['refCost'].setEditable();
		}
	},
	computed: {
		items() {
			return new Array(10).fill(1).map((_, index) => {
				return this.factorial(index + 1);
			});
		},
		answer() {
			return Random.int(1, this.items.length);
		},
		error() {
			return this.cost !== this.factorial(this.answer) ? 'Неверно' : null;
		}
	}
});
</script>

<style lang="scss" scoped>
.example + .example {
	margin-top: 40px;
}
</style>
