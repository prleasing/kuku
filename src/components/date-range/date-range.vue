<template>
	<div :class="classes">
		<div :class="bem('date')">
			<date-field ref="inputFrom" v-model="from" :fmp="fmp" :min="min" :max="maxFrom" @change="onChangeFrom" />
		</div>
		<span>—</span>
		<div :class="bem('date')">
			<date-field ref="inputTo" v-model="to" :fmp="fmp" :min="minTo" :max="max" @change="onChangeTo" />
		</div>
		<button :class="bem('button')" @click="open">
			<icon name="calendar" :width="24" />
		</button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue';
import { DateTime } from 'luxon';
import { useDateFormat, useModel, useExpose } from '@prleasing/use';
import { Icon } from '../icon';
import { DateField } from '../date-field';
import { createNamespace } from '../../util';
import { useClasses } from '../../composables';

const [name, bem] = createNamespace('date-range');

type ModelValue = [string, string];
export default defineComponent({
	name,
	components: { Icon, DateField },
	props: {
		min: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return DateTime.now().set({ year: 2010, day: 1, month: 1 }).toISODate();
			}
		},
		max: {
			type: String as PropType<string>,
			required: false,
			default(this: void) {
				return DateTime.now().plus({ year: 5 }).endOf('year').toISODate();
			}
		},
		gap: {
			type: Number as PropType<number>,
			required: false,
			default: 7
		},
		modelValue: {
			type: Array as PropType<string[]>,
			required: false,
			default(this: void) {
				return [DateTime.now().plus({ day: -7 }).toISODate(), DateTime.now().toISODate()];
			}
		}
	},
	setup(props) {
		const { modelValue } = useModel<ModelValue>();

		function fmp(date: DateTime) {
			let format = 'dd LLL';

			if (DateTime.now().year !== date.year) {
				format += ' y';
			}
			return date.toFormat(format, {
				locale: 'RU'
			});
		}

		const [from, strFrom] = useDateFormat(modelValue.value[0], fmp);
		const [to, strTo] = useDateFormat(modelValue.value[1], fmp);

		const maxFrom = computed(() => DateTime.fromISO(to.value).plus({ day: -props.gap }).toISODate());
		const minTo = computed(() => DateTime.fromISO(from.value).plus({ day: props.gap }).toISODate());

		const classes = useClasses(bem);
		const inputFrom = useExpose(DateField);
		const inputTo = useExpose(DateField);

		function onChangeFrom() {
			if (inputTo.value) {
				inputTo.value.focus();
			}
		}
		function onChangeTo() {
			if (inputTo.value) {
				updateModel();
				inputTo.value.blur();
			}
		}

		function updateModel() {
			modelValue.value = [from.value, to.value];
		}

		function openCalendar() {
			if (inputFrom.value) {
				inputFrom.value.focus();
			}
		}

		function update() {
			modelValue.value = [from.value, to.value];
		}

		watch(from, update);
		watch(to, update);

		watch(modelValue, (value) => {
			[from.value, to.value] = value;
		});
		return {
			bem,
			classes,
			open: openCalendar,
			updateModel,
			from,
			to,
			strFrom,
			strTo,
			inputFrom,
			inputTo,
			minTo,
			maxFrom,
			fmp,
			onChangeFrom,
			onChangeTo
		};
	}
});
</script>

<style lang="scss">
@use '../../assets/style/util';
@use '../../assets/style/button';
.kuku-date-range {
	display: flex;
	flex-wrap: nowrap;
	gap: calc(#{(util.calculate-size(4))});
	align-items: center;
	overflow: hidden;
	&__date {
		position: relative;
	}

	&__button {
		@include button.reset;
		aspect-ratio: 1 / 1;
		display: flex;
		color: #2ab37b;
		z-index: 1;
		padding: calc(#{(util.calculate-size(4))});
		> .kuku-icon {
			margin: 0;
		}
	}
}
</style>
