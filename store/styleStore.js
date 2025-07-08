//init store
export const state = () => ({
  projectConfigs: ""
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
