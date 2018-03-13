import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isShowHeader: true,
  isShowFooter: false
}

export default new Vuex.Store({
  state,
  mutations: {
    header (state, isShow) {
      state.isShowHeader = isShow
    },
    footer (state, isShow) {
      state.isShowFooter = isShow
    }
  }
})
