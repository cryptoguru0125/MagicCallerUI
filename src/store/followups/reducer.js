import { types } from './actions'

const initialState = []

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.FOLLOWUP_GET:
      return payload

    case types.FOLLOWUP_CREATE:
      return !payload.incoming ? [...appState, payload] : [payload, ...appState]

    case types.FOLLOWUP_UPDATE:
      console.log('updating...')
      return appState.map(item =>
        payload.id === item.id ? { ...item, ...payload } : item
      )

    case types.FOLLOWUP_DELETE:
      return appState.filter(item => item.id !== payload)

    default:
      return appState
  }
}

export const getFollowUps = state => state.followups
