import { createActions } from 'redux-actions'
import * as api from 'utils/api'
import { showSpinner, hideSpinner } from 'store/app/actions'
import { showNotify } from 'utils/notify'

export const types = createActions(
  'GET_MESSAGES',
  'SEND_MESSAGE',
  'NEW_MESSAGE',
)

export const getMessages = contactId => dispatch => {
  dispatch(showSpinner('messages'))
  return api
    .get(`/sms-contacts/${contactId}/messages`)
    .then(res => {
      dispatch(types.getMessages(res))
    })
    .finally(() => {
      dispatch(hideSpinner('messages'))
    })
}

export const sendMessage = (contactId, body) => dispatch => api
  .post(`/sms-contacts/${contactId}/messages`, body)
  .then(res => {
    dispatch(types.sendMessage(res))
  })
  .catch(() => {
    showNotify('Sorry, failed on sending message', 'error')
  })
