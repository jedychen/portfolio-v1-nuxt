const contentful = require('contentful')
const download = require('download')
const path = require('path')
//const {writeFile, readFile} = require('fs-extra')
const fs = require('fs')
const sqip = require('sqip')
require('dotenv').config({ path: '.env' })

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const IMAGE_FOLDER = path.join(__dirname, '../assets/images');

async function sqipItems () {
  const {items} = await client.getAssets({limit: 1000});
  let images = items
  .filter(
    ({fields}) => fields.file && ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].indexOf(fields.file.contentType) !== -1
  )
  .map(({sys, fields}) => ({
    id: sys.id,
    revision: sys.revision,
    url: fields.file.url,
    filename: `${sys.id}.${fields.file.url.split('.').pop()}`,
    filetype: `${fields.file.contentType.split('/')[1]}`,
    svg: null
  }));
  console.log(`Asset information queried - ${images.length} assets`)

  console.log('// --------------------------------------------')

  console.log('Downloading images for SVGs...')
  await Promise.all(
    images.map(({url, filename}, index) => {
      // process.stdout.clearLine();  // clear current text
      // process.stdout.cursorTo(0);  // move cursor to beginning of line
      // process.stdout.write(`[${index + 1}/${images.length}] ${filename}`)
      
      // Remove the code below if need to overwrite all the images
      if (fs.existsSync(IMAGE_FOLDER + '/' + filename)) {
        //console.log(`file ${filename} exist`)
        return;
      }
      console.log(`file ${filename} doesn't exist`)
      return download(
        url.replace(/\/\//, 'https://'),
        IMAGE_FOLDER,
        { filename }
      )
    })
  );
  console.log('Images downloaded');

  console.log('// --------------------------------------------')

  // console.log('Creating SVGs...')
  // await Promise.all(images.map(({id, filename, filetype}, index) => {
  //   if (filetype == 'gif') return;
  //   //This line below might cause issue. Can remove if needed
  //   process.stdout.clearLine();  // clear current text
  //   process.stdout.cursorTo(0);  // move cursor to beginning of line
  //   process.stdout.write(`[${index + 1}/${images.length}] ${filename}`);
  //   const {final_svg} = sqip({
  //     filename: path.join(IMAGE_FOLDER, filename),
  //     numberOfPrimitives: 10,
  //     mode: 0,
  //     blur: 0
  //   })

  //   return writeFile(
  //     path.join(IMAGE_FOLDER, `${filename.split('.')[1]}.svg`),
  //     final_svg
  //   )
  // }))
  // console.log('SVGs created')

  // console.log('// --------------------------------------------')
}

sqipItems()