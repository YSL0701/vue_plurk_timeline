export default {
  state: {
    accountList: []
  },
  mutations: {
    setAccountList(state, payload) {
      state.accountList = payload
    },
    addToAccountList(state, account) {
      state.accountList.push(account)
    },
    removeAccount(state, index) {
      state.accountList.splice(index, 1)
    }
  }
}
