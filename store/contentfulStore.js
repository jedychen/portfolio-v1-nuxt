//init store
export const state = () => ({
  projectConfigs: "",
  useLocalData: true
});

export const getters = {
  getProjectConfigs(state) {
    return state.projectConfigs;
  }
};

export const mutations = {
  setProjectConfigs(state, json) {
    state.projectConfigs = json;
  }
};
