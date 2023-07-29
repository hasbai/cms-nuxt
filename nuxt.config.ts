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
      link: [],
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
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.BASE_URL || '',
        changeOrigin: true,
      },
    },
    routeRules: {
      '/api/**': {
        proxy: `${process.env.BASE_URL || ''}/**`
      }
    }
  },

})