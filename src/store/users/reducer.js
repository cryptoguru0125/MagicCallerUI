import { handleActions } from 'redux-actions'
import { types } from './actions'

const defaultState = {
  agents: [],
}

export default handleActions(
  {
    [types.getUserAgents]: (state, { payload }) => ({
      ...state,
      agents: payload,
    }),

    [types.createUser]: (state, { payload }) => ({
      ...state,
      agents: [...state.agents, payload],
    }),

    [types.updateUser]: (state, { payload }) => ({
      ...state,
      agents: state.agents.map(item => item.id === payload.id ? payload : item),
    }),

    [types.deleteUser]: (state, { payload }) => ({
      ...state,
      agents: state.agents.filter(item => item.id !== payload),
    }),
  },
  defaultState,
)

export const selectAgentUsers = state => state.users.agents
