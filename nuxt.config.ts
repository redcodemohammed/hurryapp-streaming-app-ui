// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    // https://nuxt.com/modules/eslint
    // https://pinia.vuejs.org/ssr/nuxt.html
    // https://v8.i18n.nuxtjs.org/
    ["@nuxtjs/eslint-module", { lintOnStart: false }],
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
        storesDirs: ["stores"],
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        langDir: "locales",
        locales: [
          {
            code: "ar",
            iso: "ar-IQ",
            file: "ar.json",
            name: "العربية",
            dir: "rtl",
          },
          {
            code: "en",
            iso: "en-US",
            file: "en.json",
            name: "English",
            dir: "ltr",
          },
        ],
        strategy: "no_prefix",
        defaultLocale: "ar",
        lazy: true,
        detectBrowserLanguage: false,
        // todo set the base url before deploying to production
      },
    ],
    [
      "@nuxt/ui",
      {
        global: true,
        icons: ["tabler", "logos"],
      },
    ],
    "@vueuse/nuxt",
    "@formkit/auto-animate", // https://google-fonts.nuxtjs.org
    "@nuxtjs/device",
    "@nuxtjs/robots",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "IBM+Plex+Sans+Arabic": true,
          "Noto+Naskh+Arabic": true,
        },
        download: true,
        outputDir: "assets",
        fontsDir: "fonts",
        stylePath: "css/fonts.css",
      },
    ],
    "@nuxt/test-utils/module",
    "nuxt-typed-router",
    "@samk-dev/nuxt-vcalendar",
  ],
  imports: {
    dirs: ["stores"],
  },
  runtimeConfig: {
    app: {
      apiURL: process.env.NUXT_API_URL,
    },
  },
});
