import { handleActions } from 'redux-actions'
import { types } from './actions'

const defaultState = {
  list: [],
  schedule: [],
}

export default handleActions(
  {
    [types.getFollowupGroups]: (state, { payload }) => ({
      ...state,
      list: payload,
    }),

    [types.createFollowupGroup]: (state, { payload }) => ({
      ...state,
      list: [...state.list, payload],
    }),

    [types.updateFollowupGroup]: (state, { payload }) => {
      return {
        ...state,
        list: state.list.map(item =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
      }
    },

    [types.deleteFollowupGroup]: (state, { payload }) => {
      return {
        ...state,
        list: state.list.filter(item => item.id !== payload),
      }
    },

    [types.getScheduleFollowupGroups]: (state, { payload }) => ({
      ...state,
      schedule: payload,
    }),
  },
  defaultState
)

export const selectFollowupGroups = state => state.followupGroups.list
export const selectScheduleFollowupGroups = state =>
  state.followupGroups.schedule
