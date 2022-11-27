
const state = {
  printDataList: []
}

const mutations = {
  SET_PRINT_DATA_LIST: (state, printDataList) => {
    state.printDataList = printDataList
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
