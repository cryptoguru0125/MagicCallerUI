import { createActions } from 'redux-actions'
import * as api from 'utils/api'
import { showNotify } from 'utils/notify'
import { showSpinner, hideSpinner } from 'store/app/actions'
import { getMessageCount } from 'store/profile/actions'

export const types = createActions(
  'GET_CONTACTS',
  'LOAD_MORE_CONTACTS',
  'UPDATE_CONTACT',
  'CLOSE_CONTACT',
  'CLEAR_CONTACT_UNREAD'
)

export const getContacts = params => dispatch => {
  dispatch(showSpinner('messageContacts'))
  return api
    .get('/sms-contacts', params)
    .then(res => {
      dispatch(types.getContacts(res))
    })
    .finally(() => {
      dispatch(hideSpinner('messageContacts'))
    })
}

export const assignAgent = (contactId, values) => dispatch =>
  api.put(`/sms-contacts/${contactId}`, values).then(res => {
    dispatch(types.updateContact(res))
    showNotify('Agent has been updated')
  })

export const clearContactUnread = contactId => dispatch =>
  api.post(`/sms-contacts/${contactId}/clear-unread`).then(() => {
    dispatch(types.clearContactUnread(contactId))
    dispatch(getMessageCount())
  })

export const closeContact = contactId => dispatch =>
  api.del(`/sms-contacts/${contactId}`).then(() => {
    dispatch(types.closeContact(contactId))
    showNotify('The contact has been closed')
  })

export const blockContact = contactId => dispatch =>
  api.post(`/sms-contacts/${contactId}/block`).then(() => {
    dispatch(types.closeContact(contactId))
    showNotify('The contact has been blocked')
  })

export const scheduleContact = (contactId, params) => dispatch =>
  api.post(`/sms-contacts/${contactId}/schedule`, params).then(
    () => {
      showNotify('The contact has been scheduled')
    },
    res => {
      showNotify(res.error || 'Sorry. Failed on scheduling', 'error')
    }
  )

export const loadMoreContacts = params => dispatch => {
  dispatch(showSpinner('messageContacts'))
  return api
    .get('/sms-contacts', params)
    .then(res => {
      dispatch(types.loadMoreContacts(res))
    })
    .finally(() => {
      dispatch(hideSpinner('messageContacts'))
    })
}
