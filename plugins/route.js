export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  app.router.afterEach((to, from) => {
    if (from.name == "index") {
      app.store.commit("flipCardStore/transitionAway");
    } else if (to.name == "index" && from.name != "index") {
      app.store.commit("flipCardStore/transitionBack");
    }
  })
};
