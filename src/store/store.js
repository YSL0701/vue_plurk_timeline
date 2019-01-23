import Vue from 'vue'
import Vuex from 'vuex'
import plurk from './modules/plurk'
import accountList from './modules/accountList'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    plurk,
    accountList
  }
})
