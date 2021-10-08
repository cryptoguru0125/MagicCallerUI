import Pusher from 'pusher-js'

import * as api from 'utils/api'
import { showNotify } from 'utils/notify'
import { getToken } from 'utils/storage'
import * as appActions from 'store/app/actions'
import { setLiveData } from 'store/livedata/actions'

export const types = {
  PROFILE_INFO: 'PROFILE_INFO',
  PROFILE_INFO_UPDATE: 'PROFILE_INFO_UPDATE',
  PROFILE_MESSAGE_COUNT: 'PROFILE_MESSAGE_COUNT',
}
export const getProfile = () => dispatch => {
  dispatch(appActions.showSpinner('PROFILE_INFO'))

  return api
    .get('/profile/info')
    .then(res => {
      // create pusher instance
      const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
        auth: {
          headers: {
            Authorization: getToken(),
          },
        },
        authEndpoint: '/api/pusher/auth',
        cluster: process.env.REACT_APP_PUSHER_CLUSTER,
        forceTLS: true,
      })

      dispatch({
        type: types.PROFILE_INFO,
        payload: { ...res, pusher },
      })

      dispatch(setLiveData('messageCount', res.messageCount))
    })
    .finally(() => {
      dispatch(appActions.hideSpinner('PROFILE_INFO'))
    })
}

export const updateProfile = values => dispatch => api.post('/profile/update', values).then(res => {
  dispatch({
    type: types.PROFILE_INFO_UPDATE,
    payload: res,
  })
  showNotify('The profile has been updated')
})

export const getMessageCount = () => dispatch => api.get('/profile/message-count').then(res => {
  dispatch(setLiveData('messageCount', res))
})

export const checkEmailExists = (email, id) => api.post('/users/email-exists', { email, id })
