import firebase from 'firebase/app'
import Api from '../../services/Api'
import {currentUser, isAuthGuardActive, haveToken, currentToken} from '@/constants/config'
import { setCurrentUser, getCurrentUser,getToken,setToken } from '../../utils'


export default {
  state: {
    currentUser: isAuthGuardActive ? getCurrentUser() : currentUser,
    token: isAuthGuardActive ? getToken() : currentToken,
    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null
  },
  getters: {
    currentUser: state => state.currentUser,
    token: state => state.token,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setToken(state,payload) {
      state.token = payload
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
      state.token = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess = true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess = true
    },
    clearError(state) {
      state.loginError = null
    }
  },
  actions: {
    login({ commit,state }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      Api.Login(payload.email, payload.password).then(
        user => {
          setToken('bearer ' + user.data.token)
          commit('setToken', 'bearer ' + user.data.token)
            Api.Me(getToken()).then(
              user => {
                setCurrentUser(user.data)
                commit('setUser', user.data)

              },
              err => {
                setCurrentUser(null);
                commit('setError', err.message)
                setTimeout(() => {
                  commit('clearError')
                }, 3000)
              }
            )
        },
        err => {
          setCurrentUser(null);
          commit('setError', err.message)
          setTimeout(() => {
            commit('clearError')
          }, 3000)
        }
      )
    },
    forgotPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(
          user => {
            commit('clearError')
            commit('setForgotMailSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    resetPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)

      firebase
        .auth()
        .confirmPasswordReset(payload.resetPasswordCode, payload.newPassword)
        .then(
          user => {
            commit('clearError')
            commit('setResetPasswordSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    signOut({ commit,state }) {
      Api.Logout(state.currentUser.user.id).then(() => {
        setCurrentUser(null);
        setToken(null);
        commit('setLogout')
      }, _error => { })
    }
  }
}
