import * as api from 'utils/api'
import { createActions } from 'redux-actions'

export const types = createActions('GET_TRANSFERS', 'GET_TRANSFER_CHARTS')

export const getTransfers = params => dispatch => api.get('/transfers', params).then(res => {
    dispatch(types.getTransfers(res))
  })

export const getTransferCharts = params => dispatch => api.get('/transfers/charts', params).then(res => {
    dispatch(types.getTransferCharts(res))
  })
