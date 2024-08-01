/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	globals: {
		env: 'readonly',
	},
	'extends': [
		// 'plugin:vue/vue3-essential',
		// 'eslint:recommended',
		// '@vue/eslint-config-prettier/skip-formatting'
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:tailwindcss/recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'semi': ['error', 'never'],
		'vue/multi-word-component-names': 'off',
		'tailwindcss/no-custom-classname': [2, {
			whitelist: ['btn', 'fi']
		}],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 5, // Максимум 1 атрибут на одной строке
				multiline: 1   // Максимум 1 атрибут на строку в многострочном режиме
			}
		],
		'vue/attributes-order': [
			'error',
			{
				'order': [
					'DEFINITION',
					'LIST_RENDERING',
					'CONDITIONALS',
					'RENDER_MODIFIERS',
					'GLOBAL',
					'UNIQUE',
					'TWO_WAY_BINDING',
					'OTHER_DIRECTIVES',
					'OTHER_ATTR',
					'EVENTS',
					'CONTENT'
				],
				'alphabetical': false
			}
		]
	}
}
