// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  app: {
    head: {
      title: 'cms',
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      ],
      htmlAttrs: {
        lang: 'zh-CN',
        'data-theme': 'default',
      },
      script: [],
      link: [
        {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
        {rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: 'anonymous'},
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Noto+Serif+SC:wght@500;700&display=swap'
        }
      ],
      style: []
    }
  },
// @ts-ignore
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    apiSecret: '123',
    public: {
      baseURL: process.env.BASE_URL || '',
    }
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
  pinia: {
    autoImports: [
      'defineStore', // automatically imports `defineStore`
    ]
  },
  routeRules: {
    '/api/**': {
      proxy: `${process.env.BASE_URL}/api/**`,
    },
  },
})