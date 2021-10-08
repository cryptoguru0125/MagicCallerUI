import { types } from './actions'

const initialState = null

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.AUTH_LOGIN:
      return payload
    case types.AUTH_LOGOUT:
      return null
    default:
      return appState
  }
}
