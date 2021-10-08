import update from 'immutability-helper'
import { types } from './actions'

const initialState = {
  list: [],
  current: null,
}

export default (appState = initialState, { type, payload }) => {
  switch (type) {
    case types.CAMPAIGN_GET:
      return update(appState, {
        list: { $set: payload },
      })

    case types.CAMPAIGN_CREATE:
      return update(appState, {
        list: { $push: [payload] },
      })

    case types.CAMPAIGN_UPDATE:
      return update(appState, {
        list: arr => arr.map(campaign => campaign.id === payload.id ? payload : campaign),
      })

    case types.CAMPAIGN_DETAIL:
      return update(appState, {
        current: { $set: payload },
      })

    case types.CAMPAIGN_DELETE:
      return {
        ...appState,
        list: appState.list.filter(item => item.id !== payload),
      }

    default:
      return appState
  }
}

export const getCampaigns = state => state.campaigns.list
export const getCurrentCampaign = state => state.campaigns.current
