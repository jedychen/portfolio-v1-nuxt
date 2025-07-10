//init store
export const state = () => ({
  projectConfigs: "",
  useLocalData: true // Update here if need to connect to remote Contentful data in real time
});

export const getters = {
  getProjectConfigs(state) {
    return state.projectConfigs;
  },
  getUseLocalData(state) {
    return state.useLocalData;
  }
};

export const mutations = {
  setProjectConfigs(state, json) {
    state.projectConfigs = json;
  }
};
