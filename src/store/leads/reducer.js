import { types } from './actions'

const initialState = {
  list: {
    page: 0,
    pageCount: 0,
    rows: [],
  },
  charts: {
    chartFormat: 'daily',
    charts: [],
    summary: {},
  },
}

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.LEAD_GET:
      return {
        ...appState,
        list: payload,
      }

    case types.LEAD_ADD:
      return {
        ...appState,
        list: {
          ...appState.list,
          rows: [payload, ...appState.list.rows],
        },
      }

    case types.LEAD_UPDATE:
      return {
        ...appState,
        list: {
          ...appState.list,
          rows: appState.list.rows.map(item =>
            item.id === payload.id ? payload : item
          ),
        },
      }

    case types.LEAD_DELETE:
      return {
        ...appState,
        list: {
          ...appState.list,
          rows: appState.list.rows.filter(item => item.id !== payload),
        },
      }

    case types.LEAD_CHART:
      return {
        ...appState,
        charts: payload,
      }

    default:
      return appState
  }
}

export const selectLeads = state => state.leads.list
export const selectLeadCharts = state => state.leads.charts
