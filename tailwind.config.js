import colors from 'tailwindcss/colors.js';

const spacingControlClasses = ({ addUtilities }) =>{
    const generateUtilities = (prefix, property) => {
        const max = 10;
        const multiplier = 2;

        const utilities = {};
        for (let i = 0; i <= max; i++) {
            utilities[`.${prefix}-${i}`] = { [property]: `${i * multiplier}rem !important` };
        }

        return utilities;
    };

    let utilities = {
        ...generateUtilities('spc-mt', 'marginTop'),
        ...generateUtilities('spc-mb', 'marginBottom'),
        ...generateUtilities('spc-pt', 'paddingTop'),
        ...generateUtilities('spc-pb', 'paddingBottom'),
    };

    const responsiveUtilities = {
        '@screen md': {
            ...generateUtilities('md:spc-mt', 'marginTop'),
            ...generateUtilities('md:spc-mb', 'marginBottom'),
            ...generateUtilities('md:spc-pt', 'paddingTop'),
            ...generateUtilities('md:spc-pb', 'paddingBottom'),
        },
    };

    addUtilities({ ...utilities, ...responsiveUtilities }, ['responsive']);
};

const config = {
    content: ['./app/**/*.php', './resources/**/*.{php,js,svg}'],
    theme: {
        container: {
            center: true,
            padding: {
                'DEFAULT': '1rem',
                'sm': '2rem',
                'lg': '4rem',
                'xl': '5rem',
                '2xl': '6rem',
            },
        },
        colors: {
            transparent: colors.transparent,
            primary: {
                50: '#e5f3e9',
                100: '#cbebd3',
                200: '#97d7a7',
                300: '#64c27b',
                400: '#42b35c',
                500: '#3F9B53',
                600: '#388d4b',
                700: '#307841',
                800: '#266338',
                900: '#1d4f2f',
            },
            secondary: {
                50: '#fdf5e5',
                100: '#faeacb',
                200: '#f5d597',
                300: '#f0bf64',
                400: '#ebb53f',
                500: '#F0BA02',
                600: '#d9a802',
                700: '#b58e02',
                800: '#917301',
                900: '#6c5801',
            },
            tertiary: {
                DEFAULT: '#319795',
                50: '#e6fffa',
                100: '#b2f5ea',
                200: '#81e6d9',
                300: '#4fd1c5',
                400: '#38b2ac',
                500: '#319795',
                600: '#2c7a7b',
                700: '#285e61',
                800: '#234e52',
                900: '#1d4044',
            },
            white: colors.white,
            black: colors.black,
            gray: colors.gray,
        },
        fontFamily: {
            'sans': ['Raleway', 'sans-serif'],
            'bitter': ['Bitter', 'serif'],
        },
    },
    plugins: [ spacingControlClasses ],
    safelist: [
        {
            pattern: /bg-/,
        },
        {
            pattern: /^(mt|mb|pt|pb)-\d+$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            // Spacing control classes
            pattern: /^spc-(mt|mb|pt|pb)-\d+$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /(columns|grid-cols)-\d+$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
        {
            pattern: /^(from|to)-.*$/,
            variants: ['sm', 'md', 'lg', 'xl'],
        },
    ],
};

export default config;
