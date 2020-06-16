import FlipCard from "~/assets/js/flipCard.js";

export const state = () => ({
  flipCard: new FlipCard(),
})

export const getters = {
  getLoadingProgress(state) {
    return state.flipCard.getLoadingProgress() * 100;
  },
  getClickedProject(state) {
    return state.flipCard.getUrl();
  },
}

export const mutations = {
  initFlipCard(state, container) {
    state.flipCard.init(container);
    state.flipCard.animate();
  },
  setRenderFlipCard(state, rendering) {
    state.flipCard.setRendering(rendering);
  },
  flipCardTransitionAway(state) {
    state.flipCard.transitionAway();
  },
  flipCardTransitionBack(state) {
    state.flipCard.transitionBack();
  },
}
