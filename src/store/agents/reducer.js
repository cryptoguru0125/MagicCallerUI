import update from 'immutability-helper'
import { types } from './actions'

const initialState = {
  list: [],
  numbers: [],
}

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.AGENT_GET:
      return update(appState, {
        list: { $set: payload },
      })

    case types.AGENT_CREATE:
      return update(appState, {
        list: { $push: [payload] },
      })

    case types.AGENT_UPDATE:
      return update(appState, {
        list: arr => arr.map(agent => (agent.id === payload.id ? payload : agent)),
      })

    case types.AGENT_DELETE:
      return {
        ...appState,
        list: appState.list.filter(item => item.id !== payload),
      }

    case types.AGENT_NUMBERS:
      return update(appState, {
        numbers: { $set: payload },
      })

    default:
      return appState
  }
}

export const getAgents = state => state.agents.list
export const getNumbers = state => state.agents.numbers
