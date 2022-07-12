# @prleasing/kuku

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

## Компоненты

### Элементы формы

| Имя компонента                                                           | Описание                                   |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| [text-field](src/components/text-field/text-field.vue)                   | Поле ввода текста                          |
| [security-field](src/components/security-field/security-field.vue)       | Поле ввода пароля                          |
| [select-field](src/components/select-field/select-field.vue)             | Выпадающий список                          |
| [select-auto-size](src/components/select-auto-size/select-auto-size.vue) | Выпадающий список с автошириной            |
| [checkbox-field](src/components/checkbox-field/checkbox-field.vue)       | Checkbox                                   |
| [date-field](src/components/date-field/date-field.vue)                   | Выбор даты                                 |
| [date-range](src/components/date-range/date-range.vue)                   | Выбор диапазона дат                        |
| [slider-native](src/components/slider-native/slider-native.vue)          | Базовый выбор числа в указанном промежутке |
| [slider-field](src/components/slider-field/slider-field.vue)             | Выбор числа в указанном промежутке         |
| [code-field](src/components/code-field/code-field.vue)                   | Ввод символьного кода                      |
| [text-field-label](src/components/text-field-label/text-field-label.vue) | Лейбл элемента формы                       |

#### Составные элементы формы

| Имя компонента                                                                    | Описание                              |
| --------------------------------------------------------------------------------- | ------------------------------------- |
| [form-element](src/components/form-element/form-element.vue)                      | Базовый элемент                       |
| [form-code-element](src/components/form-code-element/form-code-element.vue)       | Ввод символьного кода                 |
| [form-element-slider](src/components/form-element-slider/form-element-slider.vue) | Обертка для выбора числа в промежутке |

### Табы

| Имя компонента                                                  | Описание                |
| --------------------------------------------------------------- | ----------------------- |
| [line-tabs](src/components/line-tabs/line-tabs.vue)             | Линейные табы           |
| [line-tab-item](src/components/line-tab-item/line-tab-item.vue) | Линейный таб            |
| [tabs-base](src/components/tabs-base/tabs-base.vue)             | Базовый компонент табов |
| [tab-base-item](src/components/tab-base-item/tab-base-item.vue) | Базовый таб             |
| [tabs](src/components/tabs/tabs.vue)                            | Кластические табы       |
| [tab-item](src/components/tab-item/tab-item.vue)                | Кластический таб        |

### Модальные окна

| Имя компонента                                         | Описание               |
| ------------------------------------------------------ | ---------------------- |
| [modal](src/components/modal/modal.vue)                | Базовое модальное окно |
| [modal-card](src/components/modal-card/modal-card.vue) | Модальная карточка     |
| [modal-page](src/components/modal-page/modal-page.vue) | Модальная страница     |

#### Диалоговые окна

| Имя компонента                                                                 | Описание                                            |
| ------------------------------------------------------------------------------ | --------------------------------------------------- |
| [dialog-wrapper](src/components/dialog-wrapper/dialog-wrapper.vue)             | Обертка над списком диалогов                        |
| [async-confirm-dialog](src/components/dialog/confirm/async-confirm-dialog.vue) | Вспомогательный элемент для вызова диалогового окна |
| [confirm-dialog](src/components/dialog/confirm/confirm-dialog.vue)             | Диалог запрашивания разрешения                      |
| [confirm-text](src/components/dialog/confirm/confirm-text.vue)                 | Запрашиваемые текст                                 |

### Разное

| Имя компонента                                                              | Описание                             |
| --------------------------------------------------------------------------- | ------------------------------------ |
| [icon](src/components/icon/icon.vue)                                        | Иконки                               |
| [button](src/components/button/button.vue)                                  | Кнопка                               |
| [error-text](src/components/error-text/error-text.vue)                      | Текст ошибки                         |
| [touche-drag](src/components/touche-drag/touche-drag.vue)                   | Элемент для перехвата перетаскивания |
| [overlay](src/components/overlay/overlay.vue)                               | Заливка страницы для модальных окон  |
| [reference](src/components/reference/reference.vue)                         | Модальная подсказка                  |
| [switch](src/components/switch/toggle-switch.vue)                           | Переключатель                        |
| [horizontal-scroll](src/components/horizontal-scroll/horizontal-scroll.vue) | Горизонтальный скролл                |
| [vertical-scroll](src/components/vertical-scroll/vertical-scroll.vue)       | Вертикальный скролл                  |

## Плагины

### Диалоги

```vue
<template>
	<dialog-wrapper />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog, DialogWrapper } from '@prleasing/kuku';
export default defineComponent({
	components: { DialogWrapper },
	setup() {
		Dialog.Confirm('Добавить приложение на рабочий стол?', {
			textConfirm: 'Установить'
		}).then((result: Boolean) => {
			console.log(result);
		});
	}
});
</script>
```
