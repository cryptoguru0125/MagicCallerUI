import { createActions } from 'redux-actions'
import { push } from 'connected-react-router'
import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = createActions(
  'GET_NUMBERS',
  'CREATE_NUMBER',
  'GET_NUMBER',
  'UPDATE_NUMBER',
  'DELETE_NUMBER'
)

export const getNumbers = params => dispatch =>
  api.get('/numbers', params).then(res => {
    dispatch(types.getNumbers(res))
  })

export const createNumber = values => dispatch =>
  api.post('/numbers', values).then(
    res => {
      dispatch(types.createNumber(res))
      showNotify('The number has been added')
    },
    res => {
      showNotify(
        typeof res.errors === 'string'
          ? res.errors
          : 'Sorry, adding number failed',
        'error'
      )
      throw res
    }
  )

export const getNumber = id => dispatch =>
  api.get(`/numbers/${id}`).catch(() => {
    dispatch(push('/'))
  })

export const updateNumber = (numberId, values) => dispatch =>
  api.put(`/numbers/${numberId}`, values).then(res => {
    dispatch(types.updateNumber(res))
    showNotify('The number has been updated')
  })

export const deleteNumber = numberId => dispatch =>
  api.del(`/numbers/${numberId}`).then(() => {
    dispatch(types.deleteNumber(numberId))
    showNotify('The number has been deleted')
  })
