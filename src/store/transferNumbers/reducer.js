import { types } from './actions'

const initialState = []

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.TRANSFER_NUMBER_GET:
      return payload

    case types.TRANSFER_NUMBER_CREATE:
      return [...appState, payload]

    case types.TRANSFER_NUMBER_UPDATE:
      return appState.map(item => (item.id === payload.id ? payload : item))

    case types.TRANSFER_NUMBER_DELETE:
      return appState.filter(item => item.id !== payload)

    case types.TRANSFER_NUMBER_SWITCH_ORDER: {
      const { oldNumber, newNumber } = payload

      return appState.map(item => {
        if (item.id === oldNumber.id) return { ...item, order: newNumber.order }
        if (item.id === newNumber.id) return { ...item, order: oldNumber.order }

        return item
      })
    }

    default:
      return appState
  }
}

export const getTransferNumbers = state => state.transferNumbers
