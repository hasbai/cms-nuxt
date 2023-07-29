export const content = [
  "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  "./nuxt.config.{js,ts}",
  "./app.vue",
];
export const theme = {
  extend: {},
};
export const plugins = [
  require("daisyui"),
  require('@tailwindcss/typography'),
];

export const daisyui = {
  themes: [
    {
      default: {
        "primary": "#1d4ed8",
        "secondary": "#0e7490",
        "accent": "#1dcdbc",
        "neutral": "#2b3440",
        "base-100": "#F3F3F3FF",
        "info": "#0284c7",
        "success": "#15803d",
        "warning": "#d97706",
        "error": "#b91c1c",
      },
    },
  ],
}