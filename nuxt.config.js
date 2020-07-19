import colors from 'vuetify/es5/util/colors'
import minifyTheme from 'minify-css-string'

require('dotenv').config({ path: '.env' })

export default {
  mode: 'spa',
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
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
