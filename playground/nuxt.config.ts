export default defineNuxtConfig({

  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2024-12-23',

  esToolkit: {
    utilities: ['predicate'],
  },
})
