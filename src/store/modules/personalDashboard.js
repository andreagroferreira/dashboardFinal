import Api from '../../services/Api'
import { getCurrentUser,getToken } from '../../utils'

const state = {
  resumeResult: {},
  conversionChart: {},
  lastLeadsConverted: []
}

const mutations = {
  setResumeResult(state, payload) {
    state.resumeResult = payload
  },
  setConversionChart(state, payload) {
    state.conversionChart = payload
  },
  lastLeadsConverted(state, payload) {
    state.lastLeadsConverted = payload
  }
}

const getters = {
  resumeResult: state => state.resumeResult,
  conversionChart: state => state.conversionChart,
  lastLeadsConverted: state => state.lastLeadsConverted
}


const actions = {
  ResumeResult({ commit }, payload)
  {
    Api.ResumeResultDash(getCurrentUser().user.id).then(
      result => {
        console.log(result)
        commit('setResumeResult',result.data)
      },
      err => {
        console.log(error)
      }
    )
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}


