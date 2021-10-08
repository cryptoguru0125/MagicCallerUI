import { push } from 'connected-react-router'
import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = {
  AGENT_GET: 'AGENT_GET',
  AGENT_CREATE: 'AGENT_CREATE',
  AGENT_UPDATE: 'AGENT_UPDATE',
  AGENT_DELETE: 'AGENT_DELETE',
  AGENT_NUMBERS: 'AGENT_NUMBERS',
}

export const getAgents = values => dispatch => api.get('/agents', values).then(res => {
  dispatch({
    type: types.AGENT_GET,
    payload: res,
  })
})

export const createAgent = values => dispatch => api.post('/agents', values).then(res => {
  dispatch({
    type: types.AGENT_CREATE,
    payload: res,
  })
  showNotify('The agent has been created')
})

export const getAgent = id => dispatch => api
  .get(`/agents/${id}`)
  .then(res => {
    dispatch({
      type: types.AGENT_DETAIL,
      payload: res,
    })
  })
  .catch(() => {
    dispatch(push('/'))
  })

export const updateAgent = (agentId, values) => dispatch => api.put(`/agents/${agentId}`, values).then(res => {
  dispatch({
    type: types.AGENT_UPDATE,
    payload: res,
  })
  showNotify('The agent has been updated')
})

export const deleteAgent = agentId => dispatch => api.del(`/agents/${agentId}`).then(() => {
  dispatch({
    type: types.AGENT_DELETE,
    payload: agentId,
  })
  showNotify('The agent has been deleted')
})
