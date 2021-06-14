import FlipCardManager from "~/assets/js/flipCardManager.js";

export const state = () => ({
  flipCard: new FlipCardManager(),
  transitionAwayTimer: null,
})

export const getters = {
  getLoadingProgress(state) {
    return state.flipCard.getLoadingProgress() * 100;
  },
  getClickedProject(state) {
    return state.flipCard.getUrl();
  },
  // Jedy: Password Disabled
  // getPasswordProtectionState(state) {
  //   return state.flipCard.getPasswordProtectionState();
  // },
}

export const mutations = {
  setConfigsData(state, json) {
    state.flipCard.setProjectConfigs(json);
  },
  init(state, container) {
    state.flipCard.init(container);
    state.flipCard.animate();
  },
  transitionAway(state) {
    state.transitionAwayTimer = 
        setTimeout(() => state.flipCard.transitionAway(), 3000);
  },
  transitionBack(state) {
    clearTimeout(state.transitionAwayTimer);
    state.flipCard.transitionBack();
  },
  swipeDevice(state, direction) {
    if (direction == 'Up')
      state.flipCard.swipDeviceUp();
    else if (direction == 'Down')
      state.flipCard.swipDeviceDown();
  },
}
