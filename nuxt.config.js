import colors from 'vuetify/es5/util/colors'
import minifyTheme from 'minify-css-string'
import axios from 'axios'
import { string } from 'mathjs'

require('dotenv').config({ path: '.env' })
const contentful = require('contentful')

export default {
  ssr: false,
  target: 'static',
  generate: {
    crawler: true,
    routes:() => {
      const client = contentful.createClient({
          space: process.env.CONTENTFUL_SPACE_ID,
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      });
  
      return client.getEntries({
          content_type: 'projectConfiguration'
      }).then((response) => {
          return response.items.map(entry => {
              return {
                  route: '/work/' + entry.fields.slug,
                  payload: entry
              };
          });
      });
    },
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/_global.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-vimeo-player',
    '~/plugins/contentful',
    '~/plugins/route',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Nuxt Style Resources modules
  */
  styleResources: {
    scss: '@/assets/styles/setup/_variables.scss',
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    'nuxt-password-protect',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/styles/_vuetifyvariables.scss'],
    frameworkOptions: "./vuetify.options.js",
  },
  /*
  ** password page protection configuration
  ** https://github.com/stephenkr/nuxt-password-protect
  */
  passwordProtect: {
    formPath: '/password',
    password: 'jedy',
    tokenSeed: 10110011110,
    cookieName: '_password',
    cookie: {
      prefix: '',
      expires: 5
    }
  },
  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs'
    ]
  },
  // [optional] site maps
  // See https://dev.to/andynoir/sitemap-for-dynamic-routes-in-nuxtjs-4b96
  sitemap: {
    hostname: 'https://jedychen.com',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
