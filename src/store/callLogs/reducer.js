import { types } from './actions'

const initialState = {
  page: 0,
  pageCount: 0,
  rows: [],
}

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.CALL_LOG_GET:
      return payload

    default:
      return appState
  }
}

export const getCallLogs = state => state.callLogs
