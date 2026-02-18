/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                teal: {
                    DEFAULT: '#008080',
                    50: '#e6f2f2',
                    100: '#cce6e6',
                    200: '#99cccc',
                    300: '#66b3b3',
                    400: '#339999',
                    500: '#008080',
                    600: '#006666',
                    700: '#004d4d',
                    800: '#003333',
                    900: '#001a1a',
                },
                'muddy-green': {
                    DEFAULT: '#4B5320',
                    50: '#f4f5ee',
                    100: '#e8ebd9',
                    200: '#d1d6b8',
                    300: '#babe96',
                    400: '#a3a975',
                    500: '#4B5320',
                    600: '#3c421a',
                    700: '#2d3213',
                    800: '#1e210d',
                    900: '#0f1106',
                },
                'ocean-blue': {
                    DEFAULT: '#006994',
                    50: '#e6f0f4',
                    100: '#cce1ea',
                    200: '#99c2d5',
                    300: '#66a4bf',
                    400: '#3386aa',
                    500: '#006994',
                    600: '#005476',
                    700: '#003f59',
                    800: '#002a3b',
                    900: '#00151e',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
