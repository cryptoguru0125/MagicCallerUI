import { handleActions } from 'redux-actions'
import { types } from './actions'

const defaultState = {
  list: {
    page: 0,
    pageCount: 0,
    rows: [],
  },
  charts: {
    summary: {},
    charts: [],
  },
}

export default handleActions(
  {
    [types.getTransfers]: (state, { payload }) => ({
      ...state,
      list: payload,
    }),
    [types.getTransferCharts]: (state, { payload }) => ({
      ...state,
      charts: payload,
    }),
  },
  defaultState,
)

export const selectTransfers = state => state.transfers.list
export const selectTransferCharts = state => state.transfers.charts
