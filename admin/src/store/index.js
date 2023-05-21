import Vue from 'vue'

import Vuex from 'vuex'

import tab from './tab'

Vue.use(Vuex)

// 创建 vuex 的实例
const store = new Vuex.Store({
    modules:{
        tab
    }
})

export default store