const { resolve } = require('path');
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components');
const { defaultTheme, defineUserConfig, viteBundler } = require('vuepress');
const { createSvgIconsPlugin } = require('vite-plugin-svg-icons');

module.exports = defineUserConfig({
	lang: 'ru-Ru',
	title: '👀 @prleasing/kuku',
	description: 'Библиотека компонентов Vue 3',
	alias: {
		'@components': resolve(__dirname, '../.vuepress/components')
	},
	base: '/kuku/',
	theme: defaultTheme({
		// sidebar array
		// all pages will use the same sidebar
		sidebar: [
			// SidebarItem
			// {
			// 	text: 'Foo',
			// 	link: '/foo/',
			// 	children: [
			// 		{
			// 			text: 'github',
			// 			link: 'https://github.com',
			// 			children: [],
			// 		},
			// 		// string - page file path
			// 		'/foo/bar.md',
			// 	],
			// },
			{
				text: 'Элементы формы',
				children: [
					{
						text: 'Текстовое поле',
						link: '/guide/forms/text-field.html'
					},
					{
						text: 'Поля для ввода секретных данных',
						link: '/guide/forms/security-field.html'
					},
					{
						text: 'Выпадающий список',
						link: '/guide/forms/select-field.html'
					},
					{
						text: 'Выпадающий список с автошириной',
						link: '/guide/forms/select-auto-size.html'
					},
					{
						text: 'Checkbox',
						link: '/guide/forms/checkbox-field.html'
					},
					{
						text: 'Выбор даты',
						link: '/guide/forms/date-field.html'
					},
					{
						text: 'Выбор диапазона дат',
						link: '/guide/forms/date-range.html'
					},
					{
						text: 'Выбор числа из диапазона',
						link: '/guide/forms/slider-native.html'
					},
					{
						text: 'Выбор числа в указанном промежутке',
						link: '/guide/forms/slider-field.html'
					},
					{
						text: 'Ввод символьного кода',
						link: '/guide/forms/code-field.html'
					}
				]
			},

			{
				text: 'Модальные окна',
				children: [
					{
						text: 'Карточка',
						link: '/guide/modal/modal-card.html'
					},
					{
						text: 'Страница',
						link: '/guide/modal/modal-page.html'
					}
				]
			},
			{
				text: 'Табы',
				children: [
					{
						text: 'Кластические',
						link: '/guide/tabs/tabs.html'
					},
					{
						text: 'Линейные табы',
						link: '/guide/tabs/inline-tabs.html'
					}
				]
			},
			{
				text: 'Диалоговые окна',
				children: [
					{
						text: 'Диалог запрашивания разрешения',
						link: '/guide/dialog/confirm.html'
					}
				]
			},
			{
				text: 'Кнопки',
				link: '/guide/button.html'
			},
			{
				text: 'Иконки',
				link: '/guide/icon.html'
			},
			{
				text: 'Переключатель',
				link: '/guide/switch.html'
			},
			{
				text: 'Горизонтальный скролл',
				link: '/guide/horizontal-scroll.html'
			}
		]
	}),
	plugins: [
		registerComponentsPlugin({
			componentsDir: resolve(__dirname, '../.vuepress/components'),
			componentsPatterns: ['**/*.vue']
		})
	],
	bundler: viteBundler({
		viteOptions: {
			resolve: {
				alias: {
					'@components': resolve(__dirname, '../.vuepress/components'),
					'@prleasing/kuku': resolve(__dirname, '../../src')
				}
			},
			plugins: [
				createSvgIconsPlugin({
					iconDirs: [resolve(__dirname, '../../src/assets/images/icon')],
					symbolId: 'icon-[name]'
				})
			]
		},
		vuePluginOptions: {}
	})
});
