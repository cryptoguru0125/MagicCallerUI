import { types } from './actions'

const initialState = []

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.TRANSFER_OPTION_GET:
      return payload

    case types.TRANSFER_OPTION_CREATE:
      return [payload, ...appState]

    case types.TRANSFER_OPTION_UPDATE:
      return appState.map(agency => payload.id === agency.id ? payload : agency)

    case types.TRANSFER_OPTION_DELETE:
      return appState.filter(agency => agency.id !== payload)

    default:
      return appState
  }
}

export const getTransferOptions = state => state.transferOptions
