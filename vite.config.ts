import { resolve } from 'path';
// @ts-ignore
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
// @ts-ignore
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig({
	define: {
		__VUE_OPTIONS_API__: JSON.stringify(true),
		__VUE_PROD_DEVTOOLS__: JSON.stringify(false)
	},
	// assetsInclude: ['**/*.svg'],
	plugins: [
		vue(),
		dts({
			cleanVueFileName: true,
			insertTypesEntry: true
		}),
		createSvgIconsPlugin({
			iconDirs: [resolve(__dirname, 'src/assets/images/icon')],
			symbolId: 'icon-[name]'
		})
	],
	build: {
		assetsInlineLimit: 0,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'kuku',
			formats: ['es', 'cjs', 'iife'],
			fileName: (format) => `index.${format}.js`
		},
		minify: 'terser',
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue'
				}
			}
		}
	}
});
