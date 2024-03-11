const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // ...
<<<<<<< HEAD
                tahiti: {
                    light: '#67e8f9',
                    DEFAULT: '#06b6d4',
                    dark: '#0e7490',
                },
                // ...
            },
            zIndex: {
                alert: '999999',
            },
=======
                'tahiti': {
                  light: '#67e8f9',
                  DEFAULT: '#06b6d4',
                  dark: '#0e7490',
                },
                // ...
              },
>>>>>>> master
        },
    },
    plugins: [],
});
