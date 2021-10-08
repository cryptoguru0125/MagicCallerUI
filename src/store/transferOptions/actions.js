import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = {
  TRANSFER_OPTION_GET: 'TRANSFER_OPTION_GET',
  TRANSFER_OPTION_CREATE: 'TRANSFER_OPTION_CREATE',
  TRANSFER_OPTION_UPDATE: 'TRANSFER_OPTION_UPDATE',
  TRANSFER_OPTION_DELETE: 'TRANSFER_OPTION_DELETE',
}

export const getTransferOptions = CampaignId => dispatch => api.get('/transfer-options', { CampaignId }).then(res => {
  dispatch({
    type: types.TRANSFER_OPTION_GET,
    payload: res,
  })
})

export const createTransferOption = values => dispatch => api.post('/transfer-options', values).then(
  res => {
    dispatch({
      type: types.TRANSFER_OPTION_CREATE,
      payload: res,
    })
    showNotify('The option has been added')
  },
  res => {
    showNotify(
      typeof res.errors === 'string'
        ? res.errors
        : 'Sorry, adding option failed',
      'error',
    )
    throw res
  },
)

export const getTransferOption = id => api.get(`/transfer-options/${id}`)

export const updateTransferOption = (optionId, values) => dispatch => api.put(`/transfer-options/${optionId}`, values).then(res => {
  dispatch({
    type: types.TRANSFER_OPTION_UPDATE,
    payload: res,
  })
  showNotify('The option has been updated')
})

export const deleteTransferOption = optionId => dispatch => api.del(`/transfer-options/${optionId}`).then(() => {
  dispatch({
    type: types.TRANSFER_OPTION_DELETE,
    payload: optionId,
  })
  showNotify('The option has been deleted')
})
