import { types } from './actions'

const initialState = []

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.IVR_GET:
      return payload

    case types.IVR_CREATE:
      return [...appState, payload]

    case types.IVR_UPDATE:
      return appState.map(agency => payload.id === agency.id ? payload : agency)

    case types.IVR_DELETE:
      return appState.filter(agency => agency.id !== payload)

    default:
      return appState
  }
}

export const getIVRs = state => state.ivr
