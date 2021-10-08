import { push } from 'connected-react-router'
import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = {
  TRANSFER_NUMBER_GET: 'TRANSFER_NUMBER_GET',
  TRANSFER_NUMBER_CREATE: 'TRANSFER_NUMBER_CREATE',
  TRANSFER_NUMBER_UPDATE: 'TRANSFER_NUMBER_UPDATE',
  TRANSFER_NUMBER_DELETE: 'TRANSFER_NUMBER_DELETE',
  TRANSFER_NUMBER_UPDATE_ORDER: 'TRANSFER_NUMBER_UPDATE_ORDER',
}

export const getTransferNumbers = params => dispatch => api.get('/transfer-numbers', params).then(res => {
  dispatch({
    type: types.TRANSFER_NUMBER_GET,
    payload: res,
  })
})

export const createTransferNumber = values => dispatch => api.post('/transfer-numbers', values).then(
  res => {
    dispatch({
      type: types.TRANSFER_NUMBER_CREATE,
      payload: res,
    })
    showNotify('The number has been added')
  },
  res => {
    showNotify(
      typeof res.errors === 'string'
        ? res.errors
        : 'Sorry, adding number failed',
      'error',
    )
    throw res
  },
)

export const getTransferNumber = id => dispatch => api.get(`/transfer-numbers/${id}`).catch(() => {
  dispatch(push('/'))
})

export const updateTransferNumber = (numberId, values) => dispatch => api.put(`/transfer-numbers/${numberId}`, values).then(res => {
  dispatch({
    type: types.TRANSFER_NUMBER_UPDATE,
    payload: res,
  })
  showNotify('The number has been updated')
})

export const deleteTransferNumber = numberId => dispatch => api.del(`/transfer-numbers/${numberId}`).then(() => {
  dispatch({
    type: types.TRANSFER_NUMBER_DELETE,
    payload: numberId,
  })
  showNotify('The number has been deleted')
})

export const updateOrder = (updated: TransferNumber[]) => dispatch => {
  const reOrdered = updated.map((item, index) => ({
    ...item,
    order: index,
  }))

  const data = reOrdered.map(item => ({ id: item.id, order: item.order }))

  api.post('/transfer-numbers/update-order', data).then(() => {})

  dispatch({
    type: types.TRANSFER_NUMBER_GET,
    payload: reOrdered,
  })
}
