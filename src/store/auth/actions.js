import { replace } from 'connected-react-router'

import * as api from 'utils/api'
import { setToken, clearInfo } from 'utils/storage'
import * as appActions from 'store/app/actions'
import { getProfile } from 'store/profile/actions'

export const types = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGUT: 'AUTH_LOGUT',
}

export const login = values => dispatch => {
  dispatch(appActions.showSpinner('login'))
  return api
    .post('/auth/login', values)
    .then(res => {
      setToken(res.token)
      return getProfile()(dispatch)
    })
    .then(() => {
      dispatch(replace('/'))
    })
    .finally(() => {
      dispatch(appActions.hideSpinner('login'))
    })
}

export const logout = () => {
  clearInfo()
  // eslint-disable-next-line
  document.location.href = '/partners/login'
}

export const forgotPassword = values => api.post('/auth/forgot-password', values)

export const checkToken = token => dispatch => {
  dispatch(appActions.showSpinner('CHECK_TOKEN'))

  return api.post('/auth/check-token', { token }).then(
    () => {
      dispatch(appActions.hideSpinner('CHECK_TOKEN'))
    },
    () => {
      dispatch(replace('/login'))
      dispatch(appActions.hideSpinner('CHECK_TOKEN'))
    },
  )
}

export const resetPassword = values => dispatch => api
  .post('/auth/reset-password', values)
  .then(res => {
    setToken(res.token)
    return getProfile()(dispatch)
  })
  .then(() => {
    dispatch(replace('/'))
  })
