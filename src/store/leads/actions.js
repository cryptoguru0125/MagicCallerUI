import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = {
  LEAD_GET: 'LEAD_GET',
  LEAD_ADD: 'LEAD_ADD',
  LEAD_UPDATE: 'LEAD_UPDATE',
  LEAD_DELETE: 'LEAD_DELETE',
  LEAD_CHART: 'LEAD_CHART',
}

export const getLeads = params => dispatch =>
  api.get('/leads', params).then(res => {
    dispatch({
      type: types.LEAD_GET,
      payload: res,
    })
  })

export const getLeadCharts = params => dispatch =>
  api.get('/leads/charts', params).then(res => {
    dispatch({
      type: types.LEAD_CHART,
      payload: res,
    })
  })

export const getLeadDetail = LeadId => api.get(`/leads/${LeadId}`)

export const addInteraction = (LeadId, values) =>
  api
    .post(`/leads/${LeadId}/interactions`, values)
    .then(res => {
      showNotify('Interaction has been added')
      return res
    })
    .catch(() => {
      showNotify('Sorry, failed on adding interaction', 'error')
    })

export const resetLead = LeadId => dispatch =>
  api
    .post(`/leads/${LeadId}/reset`)
    .then(res => {
      dispatch({
        type: types.LEAD_UPDATE,
        payload: res,
      })
      showNotify('Lead has been reset')
    })
    .catch(() => {
      showNotify('Error occured', 'error')
    })

export const deleteLead = leadId => dispatch =>
  api.del(`/leads/${leadId}`).then(() => {
    dispatch({
      type: types.LEAD_DELETE,
      payload: leadId,
    })
    showNotify('The lead has been deleted')
  })
