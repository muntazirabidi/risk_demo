/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'risk-critical': '#dc2626',
        'risk-high': '#ea580c',
        'risk-medium': '#eab308',
        'risk-low': '#3b82f6',
        'risk-positive': '#22c55e',
      },
    },
  },
}
