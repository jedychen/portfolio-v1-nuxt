import FlipCard from "~/assets/js/flipCard.js";

export const state = () => ({
  flipCard: new FlipCard(),
  transitionAwayTimer: null,
})

export const getters = {
  getLoadingProgress(state) {
    return state.flipCard.getLoadingProgress() * 100;
  },
  getClickedProject(state) {
    return state.flipCard.getUrl();
  },
  getPasswordProtectionState(state) {
    return state.flipCard.getPasswordProtectionState();
  },
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
    state.flipCard.transitionBack();
  },
  swipeDevice(state, direction) {
    if (direction == 'Up')
      state.flipCard.swipDeviceUp();
    else if (direction == 'Down')
      state.flipCard.swipDeviceDown();
  },
}
