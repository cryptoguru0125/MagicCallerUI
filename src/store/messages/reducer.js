import { handleActions } from 'redux-actions'
import { types } from './actions'

const defaultState = {
  list: [],
}

export default handleActions(
  {
    [types.getMessages]: (state, { payload }) => ({
      ...state,
      list: payload,
    }),

    [types.sendMessage]: (state, { payload }) => ({
      ...state,
      list: [...state.list, payload],
    }),

    [types.newMessage]: (state, { payload }) => {
      const isExist = state.list.find(item => item.id === payload.id)
      return {
        ...state,
        list: isExist ? state.list : [...state.list, payload],
      }
    },
  },
  defaultState,
)

export const selectMessages = state => state.messages.list
