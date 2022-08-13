module.exports = {
    extends: ['eslint-config-jamie', 'plugin:cypress/recommended'],
    env: {
        'cypress/globals': true
    },
    rules: {
        'linebreak-style': ['off'],
        indent: ['warn', 4, { SwitchCase: 1 }]
    }
}
