// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mix, toRgba, transparentize } = require('color2k');

function setShades(colorValue, levels = []) {
  return Object.assign(
    { DEFAULT: toRgba(colorValue) },
    ...levels.map((level) => ({
      [level]:
        level > 100
          ? mix(colorValue, 'black', level / 100 - 1)
          : mix(colorValue, 'white', 1 - level / 100),
    }))
  );
}

const linkColor = '#43a796';

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['bg-success', 'bg-warning', 'bg-danger'],
  theme: {
    colors: {
      primary: setShades('#262453', [5, 10, 20, 40, 70, 80]),
      body: setShades('#262453', [40, 80]),
      link: setShades(linkColor, [10, 70, 110]),
      warning: setShades('#f5cc5b', [10, 30, 70]),
      success: setShades('#86a960', [10, 30, 70, 110]),
      danger: setShades('#ce3d3d', [10, 30, 70, 110]),
      white: setShades('white'),
      black: setShades('black'),
      grey: {
        lighter: '#f6f6f6',
        light: '#c7c7c7',
        DEFAULT: '#a4a4a4',
        dark: '#5f5f5f',
        darker: '#434343',
      },
    },
    fontFamily: {
      body: '"Open Sans", sans-serif',
      title: '"Open Sans", sans-serif',
    },
    extend: {
      borderRadius: {
        DEFAULT: '3px',
      },
      lineHeight: {
        tight: '1.3',
        5.5: '1.375rem',
      },
      screens: {
        xs: '475px',
        xl: '1400px',
      },
      padding: {
        4.5: '1.125rem',
      },
      spacing: {
        menu: '240px',
      },
      height: {
        7.5: '1.875rem',
      },
      boxShadow: {
        DEFAULT: '0 0 8px 0 rgba(0, 0, 0, 0.2)',
        input: '0 0 0 0.125em ' + transparentize(linkColor, 0.75),
      },
      fontSize: {
        '2.5xl': '1.75rem',
        '3.5xl': '2rem',
      },
    },
  },
  plugins: [],
};
