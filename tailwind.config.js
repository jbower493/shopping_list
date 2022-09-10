/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: colors.emerald[500],
                    hover: colors.emerald[600],
                    50: colors.emerald[50],
                    100: colors.emerald[100],
                    200: colors.emerald[200],
                    300: colors.emerald[300],
                    400: colors.emerald[400],
                    700: colors.emerald[700],
                    800: colors.emerald[800],
                    900: colors.emerald[900]
                },
                secondary: {
                    DEFAULT: colors.gray[200],
                    hover: colors.gray[300],
                    50: colors.gray[50],
                    100: colors.gray[100],
                    400: colors.gray[400],
                    500: colors.gray[500],
                    600: colors.gray[600],
                    700: colors.gray[700],
                    800: colors.gray[800],
                    900: colors.gray[900]
                },
                error: {
                    DEFAULT: colors.red[500],
                    hover: colors.red[600],
                    50: colors.red[50],
                    100: colors.red[100],
                    200: colors.red[200],
                    300: colors.red[300],
                    400: colors.red[400],
                    700: colors.red[700],
                    800: colors.red[800],
                    900: colors.red[900]
                }
            },
            minWidth: {
                96: '24rem',
                120: '30rem'
            }
        }
    },
    plugins: []
}
