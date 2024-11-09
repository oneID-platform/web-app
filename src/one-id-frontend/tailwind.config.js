/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				app: {
					primary: "#cae88b",
				},
			},
			fontFamily: {
				quicksand: ["Quicksand", "sans-serif"],
				manrope: ["Manrope", "sans-serif"],
				grotesk: ["Space Grotesk", "sans-serif"],
				anton: ["Anton SC", "sans-serif"],
			},
		},
	},
	plugins: [],
};
