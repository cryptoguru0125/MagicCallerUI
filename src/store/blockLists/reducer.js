import { handleActions } from 'redux-actions'
import { types } from './actions'

const defaultState = {
  list: [],
}

export default handleActions(
  {
    [types.getBlockLists]: (state, { payload }) => ({
      ...state,
      list: payload,
    }),

    [types.createBlockList]: (state, { payload }) => ({
      ...state,
      list: [...state.list, ...payload],
    }),

    [types.updateBlockList]: (state, { payload }) => {
      return {
        ...state,
        list: state.list.map(item => (item.id === payload.id ? payload : item)),
      }
    },

    [types.deleteBlockList]: (state, { payload }) => {
      return {
        ...state,
        list: state.list.filter(item => item.id !== payload),
      }
    },
  },
  defaultState
)

export const selectBlockLists = state => state.blockLists.list
