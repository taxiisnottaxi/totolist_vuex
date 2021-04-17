/* eslint-disable */
// import Vue from 'vue'
import Vue from '../js/vue';
// import Vuex from 'vuex'
import Vuex from '../js/vuex';
// import axios from 'axios'
import axios from '../js/axios.js';

// 多组件共享状态
// 声明使用Vuex进行状态管理，声明使用Vuex，这样就可以将状态从根组件声明到每一个子组件中
Vue.use(Vuex);

export default new Vuex.Store({
  // 1.单一状态树
  state: {
    // 所有的任务列表
    list: [],
    // 文本框内容
    inputValue: 'aaa',
    // 下一个id
    nextId: 5,
    viewKey: 'all'
  },
  // 2.mutations用于唯一直接更改状态的接口，外部只能提交请求，具体的执行是mutations操作的
  mutations: {
    initList(state, list) {
      state.list = list.data
    },
    // 为store中的inputValue赋值
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据id删除对应的事项任务
    removeItem(state, id){
      // 根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引删除对应的元素
      if(i !== -1){
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id);
      if(i !== -1) {
        state.list[i].done = param.status;
      }
    },
    // 清除已完成
    cleanDone(state){
      state.list = state.list.filter(x => x.done === false);
    },
    // 修改视图的关键字
    changeViewKey(state, key) {
      state.viewKey = key;
    }
  },
  // 3. 可以提交请求给mutations，可以进行任何异步操作
  actions: {
    getList(context) {
      axios.get('./list.json').then((data) => {
        context.commit('initList', data);
      })
    }
  },
  // 4. 根据state派生出另外的状态并暴露出去
  getters: {
    // 统计未完成的任务条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 按需获取数据
    infoList(state) {
      if(state.viewKey === 'all') {
        return state.list
      }
      if(state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if(state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  // 5.Vuex支持将Store分成不同的模块
  modules: {
  }
})
