import { types } from './actions'

const initialState = {
  spinners: {},
}

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.SHOW_SPINNER:
      return {
        ...appState,
        spinners: {
          ...appState.spinners,
          [payload]: true,
        },
      }
    case types.HIDE_SPINNER:
      return {
        ...appState,
        spinners: {
          ...appState.spinners,
          [payload]: false,
        },
      }
    default:
      return appState
  }
}

export const getSpinner = (state, id = 'app') => state.app.spinners[id] || false
