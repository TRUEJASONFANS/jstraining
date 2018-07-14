const Vuex = require("vuex");
const Vue = require("vue");
Vue.use(Vuex);

// 构造单例 store
const store = new Vuex.Store({
  state: {
    count: 1
  },
  getters: {//store计算属性
    getCount: state =>  {console.log("I'm called;");return state.count;}
  }, 
  mutations: {
    increment (state) { //必须是同步函数，否则状态无法追踪
      // 变更状态
      state.count++
    }
  },
  actions: {
    incrementAsync ({ commit }) {//可以是异步函数
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})

store.commit('increment');//此时状态已经变更

store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
console.log(store.getters.getCount);

setTimeout(() => {
  console.log(store.getters.getCount);
}, 5000)
