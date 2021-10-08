import { handleActions } from 'redux-actions'
import { types } from './actions'

const defaultState = {}

export default handleActions(
  {
    [types.setLiveData]: (state, { payload }) => ({
      ...state,
      [payload.key]: payload.value,
    }),
  },
  defaultState,
)

export const selectAllLiveData = state => state.livedata
export const selectLiveData = key => state => state.livedata[key]
