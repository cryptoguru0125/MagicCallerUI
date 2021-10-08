import { push } from 'connected-react-router'
import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = {
  CAMPAIGN_GET: 'CAMPAIGN_GET',
  CAMPAIGN_CREATE: 'CAMPAIGN_CREATE',
  CAMPAIGN_DETAIL: 'CAMPAIGN_DETAIL',
  CAMPAIGN_UPDATE: 'CAMPAIGN_UPDATE',
  CAMPAIGN_DELETE: 'CAMPAIGN_DELETE',
}

export const getCampaigns = values => dispatch =>
  api.get('/campaigns', values).then(res => {
    dispatch({
      type: types.CAMPAIGN_GET,
      payload: res,
    })
  })

export const createCampaign = values => dispatch =>
  api.post('/campaigns', values).then(res => {
    dispatch({
      type: types.CAMPAIGN_CREATE,
      payload: res,
    })
    showNotify('The campaign has been created')
  })

export const getCampaign = campaignId => dispatch =>
  api.get(`/campaigns/${campaignId}`).catch(() => {
    dispatch(push('/'))
  })

export const getMessageCount = campaignId =>
  api.get(`/campaigns/${campaignId}/message-count`)

export const updateCampaign = (campaignId, values) => dispatch =>
  api.put(`/campaigns/${campaignId}`, values).then(res => {
    dispatch({
      type: types.CAMPAIGN_UPDATE,
      payload: res,
    })
    showNotify('The campaign has been updated')
  })

export const deleteCampaign = campaignId => dispatch =>
  api.del(`/campaigns/${campaignId}`).then(() => {
    dispatch({
      type: types.CAMPAIGN_DELETE,
      payload: campaignId,
    })
    showNotify('The campaign has been deleted')
  })
