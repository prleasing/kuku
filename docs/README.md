# @prleasing/use

Библиотека компонентов Vue 3

## Установка

Добавьте пакет в свои dependencies, используя npm или yarn

```bash
npm i @prleasing/kuku
# или
yarn add @prleasing/kuku
```

## Использование

```vue
<template>
	<btn @click="decrement">-</btn>
	{{ current }}
	<btn brand @click="increment">+</btn>
</template>
<script lang="ts">
import { useCounter } from '@prleasing/use';
import { Btn } from '@prleasing/kuku';
import { defineComponent} from 'vue';
export default defineComponent({
    components: {Btn},
    setup() {
	    const {current, increment, decrement} = useCounter({
		    min: 0,
		    max: 20
	    });

	    return {current, increment, decrement};
    }
);
</script>
```
