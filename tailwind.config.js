const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'spin-fast': 'spin 0.5s linear infinite',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        plugin(function ({ addVariant }) {
            addVariant('htmx-request', '.htmx-request &');
        }),
    ],
};
