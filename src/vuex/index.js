import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    // state主要是设置默认数据
    state: {
        token:'',
        msg:'',
        navStatus:1,
        // requestUrl:'http://api.7ib78kg.cn/',
        // postUrl:'api/',
    },
    // mutations主要是修改store存储的值(同步)
    mutations: {
        increment(state,data){
            state.msg = data;
        },
    },
    // actions是异步的
    actions: {

    },
    getters: {
        // chengedata(state){
        //     return state.userArr
        // },
    }
});
export default store