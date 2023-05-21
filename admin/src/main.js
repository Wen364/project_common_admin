import Vue from 'vue'
import App from './App.vue'
// 引入 element-ui 和 样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 使用 elementUI
Vue.use(ElementUI);


// 引入 router
import router from '@/router'

// 引入 store
import store from '@/store'

// 引入 api
import api from '@/api'

// 引入 mock
import './api/mock'

// 关闭生产提示
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$api = api
    this.$store.commit('tab/ADDMenu',router)
  },
  beforeMount(){
    this.$router.push('/')
  }
}).$mount('#app')

