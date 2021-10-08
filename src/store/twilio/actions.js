import { createActions } from 'redux-actions'
import * as api from 'utils/api'

export const types = createActions(
  'GET_TWILIO_NUMBERS',
  'ADD_TWILIO_NUMBER',
  'REMOVE_TWILIO_NUMBER'
)

export const getTwilioNumbers = () => (dispatch, getState) => {
  const numbers = getState().twilio.numbers
  if (numbers === null) {
    return api.get('/twilio/numbers').then(res => {
      dispatch(types.getTwilioNumbers(res))
    })
  } else {
    return null
  }
}
