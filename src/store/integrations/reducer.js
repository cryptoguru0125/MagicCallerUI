import update from 'immutability-helper'
import { types } from './actions'

const initialState = {
  list: [],
  numbers: [],
  options: [],
  transferable: [],
}

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.INTEGRATION_GET:
      return update(appState, {
        list: { $set: payload },
        options: { $set: payload },
      })

    case types.INTEGRATION_CREATE:
      return update(appState, {
        list: { $push: [payload] },
      })

    case types.INTEGRATION_UPDATE:
      return update(appState, {
        list: arr =>
          arr.map(integration =>
            integration.id === payload.id ? payload : integration
          ),
      })

    case types.INTEGRATION_DELETE:
      return {
        ...appState,
        list: appState.list.filter(item => item.id !== payload),
      }

    case types.INTEGRATION_NUMBERS:
      return update(appState, {
        numbers: { $set: payload },
      })

    case types.INTEGRATION_TRANSFERABLE:
      return update(appState, {
        transferable: { $set: payload },
      })

    default:
      return appState
  }
}

export const getIntegrations = state => state.integrations.list
export const getNumbers = state => state.integrations.numbers
export const selectTransferableIntegrations = state =>
  state.integrations.transferable
