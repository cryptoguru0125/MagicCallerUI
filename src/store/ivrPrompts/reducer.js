import { types } from './actions'

const initialState = []

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.IVR_PROMPT_GET:
      return payload

    case types.IVR_PROMPT_CREATE:
      return [
        ...appState.map(item => ({
          ...item,
          first: !payload.first && item.first,
        })),
        payload,
      ]

    case types.IVR_PROMPT_UPDATE:
      return appState.map(item => item.id === payload.id
        ? {
          ...item,
          ...payload,
        }
        : {
          ...item,
          first: !payload.first && item.first,
        })

    case types.IVR_PROMPT_DELETE:
      return appState.filter(item => item.id !== payload)

    default:
      return appState
  }
}

export const getIVRPrompts = state => state.ivrPrompts
