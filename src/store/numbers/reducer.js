import { handleActions } from 'redux-actions'
import { types } from './actions'

const defaultState = []

export default handleActions(
  {
    [types.getNumbers]: (appState, { payload }) => payload,

    [types.createNumber]: (appState, { payload }) => [...appState, payload],

    [types.updateNumber]: (appState, { payload }) => {
      return appState.map(item =>
        payload.id === item.id ? { ...item, ...payload } : item
      )
    },

    [types.deleteNumber]: (appState, { payload }) =>
      appState.filter(item => item.id !== payload),
  },
  defaultState
)

export const getNumbers = state => state.numbers
