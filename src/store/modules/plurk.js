export default {
  state: {
    plurkPageData: {
      plurk: {},
      displayName: '',
      account: '',
      avatar: ''
    }
  },
  mutations: {
    setPlurkPageData(state, { plurk, displayName, account, avatar }) {
      var plurkPageData = state.plurkPageData
      plurkPageData.plurk = plurk
      plurkPageData.displayName = displayName
      plurkPageData.account = account
      plurkPageData.avatar = avatar
    }
  },
  actions: {}
}
