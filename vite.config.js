import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(), svgLoader({
			svgoConfig: {
				multipass: true
			}
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@svg': '/src/assets/svg'
		}
	},
	define: {
		'env.WEATHER_API_KEY': JSON.stringify('b7830ad2b495704f1ac6a0d091835d26'),
		'env.LOCAL_API_KEY': JSON.stringify('dc123170f473414aa1fd8c0bb1538086'),
	},

})
