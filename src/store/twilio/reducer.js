import { handleActions } from 'redux-actions'
import { types } from './actions'

const defaultState = {
  numbers: null,
}

export default handleActions(
  {
    [types.getTwilioNumbers]: (state, { payload }) => ({
      ...state,
      numbers: payload,
    }),

    [types.addTwilioNumber]: (state, { payload }) => ({
      ...state,
      numbers: [...state.numbers, { phoneNumber: payload }],
    }),

    [types.removeTwilioNumber]: (state, { payload }) => ({
      ...state,
      numbers: state.numbers.filter(item => item.phoneNumber !== payload),
    }),
  },
  defaultState
)

export const getNumbers = state => state.twilio.numbers || []
