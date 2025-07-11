const path = require("path");
const { writeFile, readFile } = require("fs-extra");
var request = require("request");
require("dotenv").config({ path: ".env" });
var url =
  "https://cdn.contentful.com/spaces/" +
  process.env.CONTENTFUL_SPACE_ID +
  "/environments/" +
  "master" +
  "/entries?access_token=" +
  process.env.CONTENTFUL_ACCESS_TOKEN;

var aboutPageUrl = url + "&content_type=aboutPage";
var projectPageUrl = url + "&content_type=projectPage";
var projectConfigurationUrl = url + "&content_type=projectConfiguration";
var projectConfigurationsUrl = url + "&content_type=projectConfigurations";
request(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.stringify(JSON.parse(body)); // curTemp holds the value we want
    writeFile(path.join("contentful/response-all.json"), data);
  }
});
request(aboutPageUrl, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.stringify(JSON.parse(body)); // curTemp holds the value we want
    writeFile(path.join("contentful/response-aboutPage.json"), data);
  }
});
request(projectPageUrl, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.stringify(JSON.parse(body)); // curTemp holds the value we want
    writeFile(path.join("contentful/response-projectPage.json"), data);
  }
});
request(projectConfigurationUrl, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.stringify(JSON.parse(body)); // curTemp holds the value we want
    writeFile(path.join("contentful/response-projectConfiguration.json"), data);
  }
});
request(projectConfigurationsUrl, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.stringify(JSON.parse(body)); // curTemp holds the value we want
    writeFile(
      path.join("contentful/response-projectConfigurations.json"),
      data
    );
  }
});
