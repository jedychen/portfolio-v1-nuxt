import projectConfigurationsJson from "@/contentful/response-projectConfigurations.json";
import aboutPageJson from "@/contentful/response-aboutPage.json";
import projectPageJson from "@/contentful/response-projectPage.json";
import resolveResponse from "contentful-resolve-response";
import * as prettify from "pretty-contentful";
import contentful from "@/plugins/contentful.js";

//init store
export const state = () => ({
  cachedProjectConfigs: "",
  useLocalData: true // Update here if need to connect to remote Contentful data in real time
});

export const getters = {
  getCachedAboutPage(state) {
    return state.aboutPage;
  },
  async getProjectConfigurations(state) {
    if (state.cachedProjectConfigs != "") return state.cachedProjectConfigs;
    var rawProjectConfigs = {};
    if (state.useLocalData) {
      console.log("Use Local Data: " + true);
      rawProjectConfigs = resolveResponse(projectConfigurationsJson);
    } else {
      await Promise.all([
        // fetch all blog posts sorted by creation date
        contentful.getEntries({
          content_type: "projectConfigurations",
          include: 6
        })
      ])
        .then(([result]) => {
          rawProjectConfigs = result.items;
          return;
        })
        .catch(console.error);
    }
    const flattenedData = prettify(rawProjectConfigs);
    state.cachedProjectConfigs = flattenedData[0].projects;
    return flattenedData[0].projects;
  },
  getProjectPage: state => async slug => {
    if (state.useLocalData) {
      console.log("Use Local Data: " + true);
      var result = resolveResponse(projectPageJson);
      const flattenedData = prettify(result);
      for (let item of flattenedData) {
        if (item.slug == slug) {
          return item;
        }
      }
    }
    return await Promise.all([
      contentful.getEntries({
        "fields.slug": slug,
        content_type: "projectPage",
        include: 6
      })
    ])
      .then(([result]) => {
        return prettify(result.items)[0];
      })
      .catch(console.error);
  },
  async getAboutPage(state) {
    var rawAboutPage = {};
    if (state.useLocalData) {
      console.log("Use Local Data: " + true);
      rawAboutPage = resolveResponse(aboutPageJson);
    } else {
      await Promise.all([
        // fetch all blog posts sorted by creation date
        contentful.getEntries({
          content_type: "aboutPage",
          include: 6
        })
      ])
        .then(([result]) => {
          rawAboutPage = result.items;
          return;
        })
        .catch(console.error);
    }
    return prettify(rawAboutPage);
  }
};

export const mutations = {
  setExample(state, json) {
    state.cachedProjectConfigs = json;
  }
};
