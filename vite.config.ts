import {resolve, isAbsolute} from 'path';
// @ts-ignore
import dts from 'vite-plugin-dts';
import {defineConfig} from 'vite';
// @ts-ignore
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

const isExternal = (id: string) => {

	if (["virtual:svg-icons-register", "plugin-vue:export-helper"].includes(id)) {
		return false
	}
	return !id.startsWith(".") && !isAbsolute(id)
};

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
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format}.js`
		},
		minify: 'terser',
		rollupOptions: {
			// external: ['vue'],
			external: isExternal,
			output: {
				preserveModules: true,
				globals: {
					vue: 'Vue'
				}
			}
		}
	}
});
