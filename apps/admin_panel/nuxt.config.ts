import { resolve } from 'node:path';
import { defineNuxtConfig } from 'nuxt/config';

import { runtimeConfig } from './src/consts/nuxtStaticConfigs';
const workspaceDir = (p?: string) => resolve(`../../${p}`);
export default defineNuxtConfig({
  apollo: {
    clients: {
      default: {
        httpEndpoint: '/api/v4/graphql',
        httpLinkOptions: {
          headers: {
            'x-request-type': 'graphql-without-status',
          },
        },
      },
      prod: {
        httpEndpoint: process.env.NUXT_PUBLIC_API_BASE as string,
      },
      receipt_client: {
        httpEndpoint: '/api/v4/graphql/out',
        httpLinkOptions: {
          headers: {
            'x-request-type': 'graphql-without-status',
          },
        },
      },
    },
  },
  app: {
    baseURL: '/beta/',
    head: {
      bodyAttrs: {
        class: 'bg-background font-IRANYekanXVF overflow-x-hidden',
      },
      htmlAttrs: {
        lang: 'fa',
      },
      link: [
        { href: 'https://www.zarinpal.com/icons/favicon.ico', rel: 'icon', type: 'image/x-icon' },
        // { href: '/manifest.json', rel: 'manifest' },
      ],
      meta: [
        { charset: 'utf-8' },
        {
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
          name: 'viewport',
        },
        { content: '#da532c', name: 'msapplication-TileColor' },
      ],
    },
  },
  build: {
    analyze: process.env.NUXT_SANDBOX_NAME !== 'production',
  },
  css: ['~/assets/scss/main.scss', '~/assets/fonts/style.css'],
  devServerHandlers: [],
  devtools: {
    enabled: process.env.NUXT_SANDBOX_NAME !== 'production',
    timeline: {
      enabled: false,
    },
  },
  experimental: {
    emitRouteChunkError: 'automatic',
  },
  image: {
    domains: ['zarinpal.com'],
  },
  imports: {
    dirs: ['stores/**', 'composables', 'composables/**', 'services/**'],
  },
  lodash: {
    alias: [
      ['camelCase', 'stringToCamelCase'],
      ['kebabCase', 'stringToKebab'],
      ['isDate', 'isLodashDate'],
    ],
    exclude: ['map'],
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: false,
  },
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    '@nuxt/image',
    'nuxt-lodash',
    '@zarinpal/ui',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@sentry/nuxt/module',
  ],
  modulesDir: [workspaceDir('node_modules')],
  nitro: {
    devProxy: {
      '/api': {
        changeOrigin: true,
        target: process.env.NUXT_PUBLIC_API_BASE,
      },
      '/api/receipt': {
        changeOrigin: true,
        secure: false,
        target: process.env.NUXT_PUBLIC_API_RECEIPT,
      },
      '/api/zarindesk': {
        changeOrigin: true,
        target: process.env.NUXT_PUBLIC_API_ZARINDESK_BASE,
      },
    },
  },
  postcss: {
    plugins: {
      autoprefixer: {},
      'postcss-import': {},
      tailwindcss: {},
      'tailwindcss/nesting': {},
    },
  },
  runtimeConfig,
  sourcemap: false,
  spaLoadingTemplate: true,
  srcDir: './src',
  ssr: false,
  typescript: {
    strict: true,
    typeCheck: false,
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['ui-'].includes(tag),
      optimizeImports: true,
    },
  },
});
