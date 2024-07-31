/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		fontFamily: {
			base: 'Gilroy, sans-serif'
		},
		extend: {
			colors: {
				main: '#BCCEFB',
				sec: '#D094EA'
			}
		},
	},
	plugins: [
		require('flowbite/plugin')
	],
}

