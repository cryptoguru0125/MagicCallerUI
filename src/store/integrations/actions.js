import { push } from 'connected-react-router'
import * as api from 'utils/api'
import { showNotify } from 'utils/notify'
import * as appActions from '../app/actions'

export const types = {
  INTEGRATION_GET: 'INTEGRATION_GET',
  INTEGRATION_CREATE: 'INTEGRATION_CREATE',
  INTEGRATION_UPDATE: 'INTEGRATION_UPDATE',
  INTEGRATION_DELETE: 'INTEGRATION_DELETE',
  INTEGRATION_NUMBERS: 'INTEGRATION_NUMBERS',
  INTEGRATION_TRANSFERABLE: 'INTEGRATION_TRANSFERABLE',
}

export const getIntegrations = values => dispatch =>
  api.get('/integrations', values).then(res => {
    dispatch({
      type: types.INTEGRATION_GET,
      payload: res,
    })
  })

export const createIntegration = values => dispatch =>
  api.post('/integrations', values).then(res => {
    dispatch({
      type: types.INTEGRATION_CREATE,
      payload: res,
    })
    showNotify('The integration has been created')
  })

export const getIntegration = id => dispatch =>
  api
    .get(`/integrations/${id}`)
    .then(res => {
      dispatch({
        type: types.INTEGRATION_DETAIL,
        payload: res,
      })
    })
    .catch(() => {
      dispatch(push('/'))
    })

export const updateIntegration = (integrationId, values) => dispatch =>
  api.put(`/integrations/${integrationId}`, values).then(res => {
    dispatch({
      type: types.INTEGRATION_UPDATE,
      payload: res,
    })
    showNotify('The integration has been updated')
  })

export const deleteIntegration = integrationId => dispatch =>
  api.del(`/integrations/${integrationId}`).then(() => {
    dispatch({
      type: types.INTEGRATION_DELETE,
      payload: integrationId,
    })
    showNotify('The integration has been deleted')
  })

export const getNumbers = id => dispatch => {
  appActions.showSpinner('integrationNumbers')

  return api.get(`/integrations/${id}/numbers`).then(res => {
    dispatch({
      type: types.INTEGRATION_NUMBERS,
      payload: res,
    }).finally(() => {
      appActions.hideSpinner('integrationNumbers')
    })
  })
}

export const testApiKey = values => api.post('/integrations/test-api', values)
export const checkYtelAgentStatus = params =>
  api.post('/integrations/ytel/agent-status', params)

export const getTransferableIntegrations = () => dispatch =>
  api.get(`/integrations/transferable`).then(res => {
    dispatch({
      type: types.INTEGRATION_TRANSFERABLE,
      payload: res,
    })
  })
