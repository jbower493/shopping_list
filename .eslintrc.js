module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:promise/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'jest'],
    settings: {
        react: {
            version: 'detect'
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true
            }
        }
    },
    globals: {
        React: true,
        google: true,
        mount: true,
        mountWithRouter: true,
        shallow: true,
        shallowWithRouter: true,
        context: true,
        expect: true,
        jsdom: true,
        JSX: true
    },
    rules: {
        '@typescript-eslint/object-curly-spacing': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'eol-last': ['error', 'always'],
        camelcase: 'off',
        semi: ['warn', 'never'],
        'arrow-parens': ['warn', 'always'],
        'new-cap': 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: {
                    var: 4,
                    let: 4
                },
                outerIIFEBody: 0
            }
        ],
        'no-useless-escape': 'off',
        'no-unused-vars': 'warn',
        'no-tabs': [
            'error',
            {
                allowIndentationTabs: true
            }
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'ignore',
                asyncArrow: 'ignore'
            }
        ],
        'promise/catch-or-return': 'off',
        'promise/always-return': 'off',
        'react/prop-types': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react-hooks/exhaustive-deps': 0,
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error'
    }
}
