import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = {
  IVR_GET: 'IVR_GET',
  IVR_CREATE: 'IVR_CREATE',
  IVR_UPDATE: 'IVR_UPDATE',
  IVR_DELETE: 'IVR_DELETE',
}

export const getIVRs = CampaignId => dispatch => api.get('/ivr', { CampaignId }).then(res => {
  dispatch({
    type: types.IVR_GET,
    payload: res,
  })
})

export const createIVR = values => dispatch => api.post('/ivr', values).then(
  res => {
    dispatch({
      type: types.IVR_CREATE,
      payload: res,
    })
    showNotify('The IVR has been added')
  },
  res => {
    showNotify(
      typeof res.errors === 'string'
        ? res.errors
        : 'Sorry, adding IVR failed',
      'error',
    )
    throw res
  },
)

export const getIVRDetail = ivrId => api.get(`/ivr/${ivrId}`)

export const updateIVR = (IVRId, values) => dispatch => api.put(`/ivr/${IVRId}`, values).then(res => {
  dispatch({
    type: types.IVR_UPDATE,
    payload: res,
  })
  showNotify('The IVR has been updated')

  return res
})

export const deleteIVR = IVRId => dispatch => api.del(`/ivr/${IVRId}`).then(() => {
  dispatch({
    type: types.IVR_DELETE,
    payload: IVRId,
  })
  showNotify('The IVR has been deleted')
})
