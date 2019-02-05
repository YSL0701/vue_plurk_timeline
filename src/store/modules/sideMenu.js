export default {
  state: {
    sideMenuOpen: false
  },
  mutations: {
    changeSideMenuState(state, payload) {
      state.sideMenuOpen = payload
    }
  }
}
