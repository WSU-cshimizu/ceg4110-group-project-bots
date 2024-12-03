/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/routes/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      animation: {
        'custom-pulse': 'customPulse 20s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        customPulse: {
          '0%, 100%': { color: 'rgba(148, 238, 196, 1)' }, // blue-500
          '50%': { color: 'rgba(255, 194, 237, 1)' }, // blue-400
        },
      },
    },
  },
  plugins: [],
}

