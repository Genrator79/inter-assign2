/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ea580c', // Orange 600 (similar to Nosh orange)
                secondary: '#f97316', // Orange 500
                dark: '#000000', // Pure Black
                card: '#121212', // Very dark grey for cards
                text: '#f8fafc', // Slate 50
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
