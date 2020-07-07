export const state = () => ({
  isProtected: true,
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
