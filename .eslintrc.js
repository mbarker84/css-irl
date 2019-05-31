module.exports = {
	globals: {
		__PATH_PREFIX__: true
	},
	parser: 'babel-eslint',
	extends: ['standard', 'plugin:react/recommended'],
	rules: {
		'comma-dangle': ['error', 'always-multiline']
	}
}
