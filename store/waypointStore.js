//init store
export const state = () => ({
  scrollPresentage: 0.0, // number, Article's page reading presentage.
  waypointPosList: new Array(100).fill(0), // list of int, Section waypoint's position in vh.
  waypointUpdatedTimes: 0, // number, how many times the waypoint list gets updated
  activeWaypointTitle: '', // string, title of the active waypoint
})

export const getters = {
  getScrollPresentage(state) {
  // For project page, get the scrolling presentage of the page,
  // and change reading indicators.
    return state.scrollPresentage
  },
  // List of waypoints' positions
  getWaypointPosList(state) {
    return state.waypointPosList
  },
  getWaypointPosListUpdated(state) {
    return state.waypointUpdatedTimes
  },
  getActiveWaypoint(state) {
    return state.activeWaypointTitle
  },
}

export const mutations = {
  setScrollPresentage(state, presentage) {
    state.scrollPresentage = presentage
  },
  setWaypoint(state, payload) {
    state.waypointPosList[payload.index] = payload.vhPos
    state.waypointUpdatedTimes += 1
  },
  setActiveWaypoint(state, payload) {
    state.activeWaypointTitle = payload
  },
}

export const strict = false
