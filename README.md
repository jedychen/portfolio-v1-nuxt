# portfolio-v1-nuxt

> Jedy's Portfolio Website with Nuxt.

## Setup

```bash
# install dependencies
$ nvm use 18
$ npm install
```
## Development

1. Pull Data from Contentful

```bash
# Pull images from contentful
$ nvm use 18
$ npm install sqip
$ npm run fetch-images # Download missing images

# Not in use: generate thumbnails for the images
$ npm run generate-image-base64 # Generate thumbnail metadata for the missing images

# Pull content (text and page structure) from contentful
$ nvm use 18
$ npm run fetch-content

# Pull all contents from contentful
$ nvm use 18
$ npm install sqip
$ npm run fetch-all

2. Fire Up the Dev Environment

# Serve with hot reload at localhost:3000
$ nvm use 12
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

3. Change Settings of Using Contentful Data
- The toggle to switch between contentful remote data or local data is stored in `store/contentfulStore.js`

## Build

1. Please use node 12.14.0, run the following code
```bash
# generate static project
$ nvm use 12
$ npm run generate
```
2. Copy all the content generated in `dist/ folder` to a desired server.

3. Update Alibaba Server
- In Alibaba server, go to `/var/www/html`, copy all the content in the local `dist/` folder into the server, and choose replace. The `demo/` folder and `google***.html` will remain unchange.


## Tips for Development

1. All the contentful data is stored locally, including images. (in contentful/)

2. Modify component in components/ folder.

3. Modify Three.js landing page in assets/js/ folder or pages/index.vue.

- For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org) and the Vuetify JS documentations.
