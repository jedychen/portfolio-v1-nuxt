export const state = () => ({
  isProtected: false,
})

export const getters = {
  getProtectionState(state) {
    return state.isProtected;
  },
}

export const mutations = {
  setProtectionState(state, protectionState) {
    state.isProtected = protectionState;
  },
}
