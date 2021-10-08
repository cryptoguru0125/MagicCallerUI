import { handleActions } from 'redux-actions'
import uniqBy from 'lodash/uniqBy'
import { types } from './actions'

const defaultState = {
  contacts: [],
}

export default handleActions(
  {
    [types.getContacts]: (state, { payload }) => ({
      ...state,
      contacts: payload,
    }),
    [types.loadMoreContacts]: (state, { payload }) => ({
      ...state,
      contacts: uniqBy([...state.contacts, ...payload], 'id'),
    }),

    [types.newContact]: (state, { payload }) => ({
      ...state,
      contacts: [payload, ...state.contacts],
    }),

    [types.updateContact]: (state, { payload }) => {
      const { contacts } = state
      let newContacts = []

      const existingIndex = contacts.findIndex(item => item.id === payload.id)

      if (existingIndex >= 0) {
        newContacts = [...contacts]
        newContacts.splice(existingIndex, 1)
        newContacts.unshift({
          ...contacts[existingIndex],
          ...payload,
        })
      } else {
        newContacts = [payload, ...contacts]
      }

      return {
        ...state,
        contacts: newContacts,
      }
    },

    [types.closeContact]: (state, { payload }) => ({
      ...state,
      contacts: state.contacts.filter(item => item.id !== payload),
    }),

    [types.clearContactUnread]: (state, { payload }) => ({
      ...state,
      contacts: state.contacts.map(item => item.id === payload
        ? {
          ...item,
          unreadCount: 0,
        }
        : item),
    }),
  },
  defaultState,
)

export const selectContacts = state => state.smsContacts.contacts
