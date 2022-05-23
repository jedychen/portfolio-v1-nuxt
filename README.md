# portfolio-v1-nuxt

> Jedy's Portfolio Website with Nuxt.

## Setup

```bash
# install dependencies
$ npm install
```
## Development

```
# get images only from contentful
$ npm run fetch-images

# get content (text and page structure) only from contentful
$ npm run fetch-content

# get all contents from contentful
$ npm run fetch-all

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```
## Generate and Export

```
# generate static project
$ npm run generate
```
Copy all the content generated in dist/ folder to a desired server.

### Update Alibaba Server
In Alibaba server, go to /var/www/html, keep the demo/ folder and google***.html.
Copy all the content in the local dist/ folder and replace the rest files.

## For Development

All the contentful data is stored locally, including images. (in contentful/)

Modify component in components/ folder.

Modify Three.js landing page in assets/js/ folder or pages/index.vue.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
# portfolio-v1-nuxt


