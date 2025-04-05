// tailwind.config.js
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brutal: {
                    black: "#0A0A0A",
                    white: "#FAFAFA",
                    yellow: "#F5E050",
                    red: "#D72638",
                    blue: "#3B44F6",
                },
                debug: '#FF00FF',
            },
            fontFamily: {
                heading: ['Space Grotesk', 'sans-serif'],
                display: ['Anton', 'sans-serif'],
                body: ['IBM Plex Sans', 'sans-serif'],
                specials: ['Staatliches', 'sans-serif'],
                syne: ['Syne', 'sans-serif']
            },
        },
    },
    plugins: [scrollbarHide],
};
