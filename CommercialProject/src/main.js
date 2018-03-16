// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'
import Vuex from 'vuex'

Vue.filter('currency', currency)
Vue.use(infiniteScroll) // 挂载到 Vue 中

Vue.use(Vuex)

Vue.use(VueLazyLoad, {
  loading: '/static/loading/loading-balls.svg'
})
Vue.config.productionTip = false

// 定义 store
const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 注册到根组件后，vue的所有组件都可以使用 store
  template: '<App/>',
  components: { App }
})
