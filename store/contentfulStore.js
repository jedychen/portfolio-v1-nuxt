import projectConfigurations from "@/contentful/response-projectConfigurations.json";
import aboutPage from "@/contentful/response-aboutPage.json";
import resolveResponse from "contentful-resolve-response";
import * as prettify from "pretty-contentful";

//init store
export const state = () => ({
  cachedProjectConfigs: "",
  useLocalData: process.env.USE_LOCAL_CONTENTFUL // Update here if need to connect to remote Contentful data in real time
});

export const getters = {
  getCachedAboutPage(state) {
    return state.aboutPage;
  },
  async getProjectConfigurations(state) {
    if (state.cachedProjectConfigs != "") return state.cachedProjectConfigs;
    var rawProjectConfigs = {};
    if (state.useLocalData == 1) {
      console.log("Use Local Data: " + true);
      rawProjectConfigs = resolveResponse(projectConfigurations);
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
  async getAboutPage(state) {
    var rawAboutPage = {};
    if (state.useLocalData == 1) {
      console.log("Use Local Data: " + true);
      rawAboutPage = resolveResponse(aboutPage);
    } else {
      Promise.all([
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
