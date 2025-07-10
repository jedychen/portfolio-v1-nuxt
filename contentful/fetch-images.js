const contentful = require("contentful");
const download = require("download");
const path = require("path");
const { writeFile, readFile } = require("fs-extra");
const fs = require("fs");
const { sqip } = require("sqip");
require("dotenv").config({ path: ".env" });

const RESET_ALL_BASE64_DATA = false; // Change this if want to reset all base64

const CLIENT = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

const IMAGE_FOLDER = path.join(__dirname, "../assets/images");
const STATIC_FOLDER = path.join(__dirname, "../static/cover");
const BASE64_PATH = path.join(
  __dirname,
  "../contentful/response-base64Generated.json"
);
const PROJECT_CONFIGURATION_PATH = path.join(
  __dirname,
  "../contentful/response-projectConfiguration.json"
);

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

async function sqipItems() {
  const { items } = await CLIENT.getAssets({ limit: 1000 });
  let images = items
    .filter(
      ({ fields }) =>
        fields.file &&
        ["image/png", "image/jpeg", "image/gif", "image/jpg"].indexOf(
          fields.file.contentType
        ) !== -1
    )
    .map(({ sys, fields }) => ({
      id: sys.id,
      revision: sys.revision,
      url: fields.file.url,
      filename: `${sys.id}.${fields.file.url.split(".").pop()}`, //use characters after the last . as name
      filetype: `${fields.file.contentType.split("/")[1]}`,
      svg: null
    }));
  console.log(`Asset Information Queried - ${images.length} Assets`);

  console.log("// --------------------------------------------");

  console.log("Downloading Images for Static Website...");
  const projectConfigurationJson = require(PROJECT_CONFIGURATION_PATH);
  const projectConfigurationString = JSON.stringify(projectConfigurationJson);
  await Promise.all(
    images.map(({ url, filename }, index) => {
      // process.stdout.clearLine();  // clear current text
      // process.stdout.cursorTo(0);  // move cursor to beginning of line
      // process.stdout.write(`[${index + 1}/${images.length}] ${filename}`)

      // For cover images, download the image and save into the static folder, for flipCardManager to use
      if (projectConfigurationString.includes(filename.split(".")[0])) {
        if (!fs.existsSync(STATIC_FOLDER + "/" + filename)) {
          console.log(`Image ${filename} doesn't exist in static folder`);
          download(url.replace(/\/\//, "https://"), STATIC_FOLDER, {
            filename
          });
        }
      }

      // For normal images, download the image with width 1920
      if (!fs.existsSync(IMAGE_FOLDER + "/" + filename)) {
        console.log(`Image ${filename} doesn't exist in image folder`);
        download(url.replace(/\/\//, "https://") + "?w=1920", IMAGE_FOLDER, {
          filename
        });
      }
      return;
    })
  );
  console.log("Images All Downloaded");

  console.log("// --------------------------------------------");
}

sqipItems();
