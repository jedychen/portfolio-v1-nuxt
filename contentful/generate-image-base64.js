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
const STATIC_FOLDER = path.join(__dirname, "../static");
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

  console.log("Creating Base64...");

  wait(10000);

  const base64Results = require(BASE64_PATH);
  const base64Array = base64Results.content;
  let finishedNumber = 0;
  await Promise.all(
    images.map(async ({ id, filename, filetype }, index) => {
      if (
        base64Array.some(item => item.name === filename) &&
        !RESET_ALL_BASE64_DATA
      )
        return;

      const svgData = await sqip({
        input: path.join(IMAGE_FOLDER, filename),
        plugins: [
          {
            name: "sqip-plugin-primitive",
            options: {
              numberOfPrimitives: 20, //default is 8
              mode: 0
            }
          },
          {
            name: "sqip-plugin-blur",
            options: {
              blur: 10 //default is 12
            }
          },
          "sqip-plugin-svgo",
          "sqip-plugin-data-uri"
        ]
      });
      // Debug Info Start: This line below might cause issue. Can remove if needed
      process.stdout.clearLine(); // clear current text
      process.stdout.cursorTo(0); // move cursor to beginning of line
      finishedNumber += 1;
      process.stdout.write(`[${finishedNumber}/${images.length}] ${filename}`);
      // Debug Info End
      base64Array.push({
        name: filename,
        data: svgData.metadata.dataURIBase64
      });
      return;
    })
  );
  base64Results.content = base64Array;

  console.log("Writing response-base64Generated.json...");
  await writeFile(path.join(BASE64_PATH), JSON.stringify(base64Results));

  console.log("SVGs created");
  console.log("// -----------------Image Process All Done------------------");
}

sqipItems();
