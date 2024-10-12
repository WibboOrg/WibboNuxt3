import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  srcDir: 'src/',

  runtimeConfig: {
      public: {
          siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
          avatarUrl: process.env.NUXT_PUBLIC_AVATAR_URL,
          assetsUrl: process.env.NUXT_PUBLIC_ASSETS_URL,
          cdnUrl: process.env.NUXT_PUBLIC_CDN_URL,
          nitroUrl: process.env.NUXT_PUBLIC_NITRO_URL,
          adminUrl: process.env.NUXT_PUBLIC_ADMIN_URL,
          siteMail: process.env.NUXT_PUBLIC_SITE_MAIL,
          clientApiUrl: process.env.NUXT_PUBLIC_CLIENT_API_URL,
          serverApiUrl: process.env.NUXT_PUBLIC_SERVER_API_URL,
      },
  },

  app: {
      pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: {
      shim: false,
      strict: true,
  },

  components: {
      dirs: ['~/components/base'],
  },

  i18n: {
      baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
      locales: [
          { code: 'fr', file: 'fr.json', name: 'Français' }, // Français - France, Canada, Belgique, Suisse
      ],
      lazy: true,
      langDir: 'locales/',
      defaultLocale: 'fr',
      detectBrowserLanguage: false,
      vueI18n: './i18n.config.ts' // if you are using custom path, default
  },

  nitro: {
    devProxy: {
      '/api/v1': {
        target: process.env.NUXT_PRIVATE_DEV_API,
        changeOrigin: true,
        prependPath: true
      }
    },
  },

  sitemap: {
      sitemaps: {
          forum: {
            sources: ['/api/sitemap'],
            include: ['/forum/sujet/**'],
          },
          article: {
            sources: ['/api/sitemap'],
              include: ['/community/news/**'],
              exclude: ['/community/news-list']
          },
          pages: {
              includeAppSources: true,
              include: ['/**', '/community/news-list', '/forum/category/0', '/forum/category/4', '/forum/category/1', '/forum/category/2', '/forum/category/3', '/forum/category/6', '/forum/category/7'],
              exclude: ['/upload-image', '/community/news/**', '/forum/sujet/**', '/hotel', '/home', '/settings/**', '/shop', 'forum/create'],
            },
        },
  },

  pwa: {
      registerType: 'autoUpdate',
      manifest: {
          name: 'Wibbo',
          lang: 'fr',
          short_name: 'Wibbo',
          description: 'Se faire des amis, s\'amuser, se faire connaitre',
          background_color: '#001726',
          display: 'fullscreen',
          scope: '/',
          theme_color: '#001726',
          orientation: 'landscape-primary',
          icons: [
              {
                src: "icons/icon_64x64.png",
                sizes: "64x64",
                type: "image/png",
                purpose: "any maskable"
              },
              {
                src: "icons/icon_120x120.png",
                sizes: "120x120",
                type: "image/png",
                purpose: "any maskable"
              },
              {
                src: "icons/icon_144x144.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "any maskable"
              },
              {
                src: "icons/icon_152x152.png",
                sizes: "152x152",
                type: "image/png",
                purpose: "any maskable"
              },
              {
                src: "icons/icon_192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any maskable"
              },
              {
                src: "icons/icon_384x384.png",
                sizes: "384x384",
                type: "image/png",
                purpose: "any maskable"
              },
              {
                src: "icons/icon_512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable"
              }
            ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        directoryIndex: '/',
        navigateFallback: null
      },
      client: {
          installPrompt: true,
          periodicSyncForUpdates: 3600,
      },
      devOptions: {
          enabled: true,
          suppressWarnings: true,
          navigateFallbackAllowlist: [/^\/$/],
          type: 'module',
        },
  },

  css: ['@/assets/scss/main.scss', '@/assets/css/tailwind.css'],

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@vite-pwa/nuxt', '@nuxtjs/robots'],
  compatibilityDate: '2024-09-13',
})
