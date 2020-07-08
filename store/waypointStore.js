//init store
export const state = () => ({
  scrollPresentage: 0.0, // number, Article's page reading presentage.
  waypointPosList: new Array(100).fill(0), // list of int, Section waypoint's position in vh.
  waypointUpdatedNumber: 0,
})

export const getters = {
  getScrollPresentage(state) {
  // For project page, get the scrolling presentage of the page,
  // and change reading indicators.
    return state.scrollPresentage;
  },
  getWaypointPosList(state) {
    return state.waypointPosList;
  },
  getWaypointPosListUpdated(state) {
    return state.waypointUpdatedNumber;
  },
}

export const mutations = {
  setScrollPresentage(state, presentage) {
    state.scrollPresentage = presentage;
  },
  setWaypoint(state, payload) {
    state.waypointPosList[payload.index] = payload.vhPos;
    state.waypointUpdatedNumber += 1;
  },
}

export const strict = false
