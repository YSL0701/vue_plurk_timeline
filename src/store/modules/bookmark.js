export default {
  state: {
    bookmarkList: [],
    pageData: {
      plurk: {},
      displayName: '',
      account: '',
      avatar: ''
    },
    isLoading: false
  },
  mutations: {
    setBookmarkPageData(state, { plurk, displayName, account, avatar }) {
      var PageData = state.pageData
      PageData.plurk = plurk
      PageData.displayName = displayName
      PageData.account = account
      PageData.avatar = avatar
    },
    addToBookmarkList({ bookmarkList }, payload) {
      bookmarkList.push(payload)
    },
    setBookmarkList(state, payload) {
      state.bookmarkList = payload
    },
    removeBookmark(state, plurk_id) {
      var removeIndex = state.bookmarkList.findIndex(bookmark => bookmark.plurk.plurk_id === plurk_id)
      if (removeIndex > -1) {
        state.bookmarkList.splice(removeIndex, 1)
      }
    },
    bookmarkLoading(state, payload) {
      state.isLoading = payload
    }
  }
}
