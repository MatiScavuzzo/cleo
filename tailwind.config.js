/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pastel-pink': {
          50: '#fef1f7',
          100: '#fee5f2',
          200: '#ffcae6',
          300: '#ffa1d1',
          400: '#ff66b1',
          500: '#fb3991',
          600: '#eb176d',
          700: '#cd0952',
          800: '#a90b45',
          900: '#8d0e3c',
          950: '#570020',
        },
      },
    },
  },
  plugins: [],
}
