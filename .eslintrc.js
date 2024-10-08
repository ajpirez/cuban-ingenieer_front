// /* eslint-disable sort-keys */
// const prettierConfig = require('./.prettierrc');
// module.exports = {
//   env: {
//     browser: true,
//     commonjs: true,
//     es2021: true,
//     node: true,
//     jest: true,
//   },
//   globals: {
//     JSX: 'readonly',
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react-hooks/recommended',
//     'plugin:prettier/recommended',
//     'next/core-web-vitals',
//   ],
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 12,
//     sourceType: 'module',
//   },
//   plugins: ['react', 'react-hooks', 'prettier', 'jsx-a11y'],
//   rules: {
//     // Possible errors
//     // 'no-console': 'warn',
//     // Best practices
//     'dot-notation': 'error',
//     'no-else-return': 'error',
//     'no-floating-decimal': 'error',
//     'no-sequences': 'error',
//     // Stylistic
//     'array-bracket-spacing': 'error',
//     'computed-property-spacing': ['error', 'never'],
//     '@next/next/no-html-link-for-pages': 'off',
//     'react/jsx-key': 'off',
//
//     curly: 'error',
//     'no-lonely-if': 'error',
//     // 'no-nested-ternary': 'error',
//     'no-unneeded-ternary': 'error',
//     'one-var-declaration-per-line': 'error',
//     quotes: [
//       'error',
//       'single',
//       {
//         allowTemplateLiterals: false,
//         avoidEscape: true,
//       },
//     ],
//     // Avoid no unused rule on arguments whose names begins with underscore (_)
//     'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
//     // ES6
//     'array-callback-return': 'off',
//     'prefer-const': 'warn',
//     // Imports
//     // 'import/order': [
//     //   'error',
//     //   {
//     //     groups: ['builtin', 'external', 'internal'],
//     //     pathGroups: [
//     //       {
//     //         pattern: 'react',
//     //         group: 'external',
//     //         position: 'before',
//     //       },
//     //     ],
//     //     pathGroupsExcludedImportTypes: ['react'],
//     //     'newlines-between': 'always',
//     //     alphabetize: {
//     //       order: 'asc',
//     //       caseInsensitive: true,
//     //     },
//     //   },
//     // ],
//     'no-unused-expressions': 'off',
//     // Using a lot of hasOwnProperty
//     'no-prototype-builtins': 'off',
//     // REACT
//     'react/jsx-uses-react': 'off',
//     'react/react-in-jsx-scope': 'off',
//     'react/display-name': 0,
//     'react/no-deprecated': 'error',
//     'react/no-unescaped-entities': 'off',
//     'react/no-unsafe': [
//       'error',
//       {
//         checkAliases: true,
//       },
//     ],
//     'react-hooks/rules-of-hooks': 'error',
//     'react-hooks/exhaustive-deps': 0,
//     // Prettier
//     // eslint looks for the prettier config at the top level of the package/app
//     // but the config lives in the `config/` directory. Passing the config here
//     // to get around this.
//     'prettier/prettier': ['error', prettierConfig],
//     //  jsx-a11y
//     'jsx-a11y/autocomplete-valid': 2,
//     'jsx-a11y/aria-role': 2,
//     'jsx-a11y/no-static-element-interactions': 2,
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
// };
