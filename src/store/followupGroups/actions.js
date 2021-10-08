import { createActions } from 'redux-actions'

import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = createActions(
  'GET_FOLLOWUP_GROUPS',
  'CREATE_FOLLOWUP_GROUP',
  'UPDATE_FOLLOWUP_GROUP',
  'DELETE_FOLLOWUP_GROUP',
  'GET_SCHEDULE_FOLLOWUP_GROUPS'
)

export const getFollowupGroups = params => dispatch =>
  api.get('/followup-groups', params).then(res => {
    dispatch(types.getFollowupGroups(res))
  })

export const createFollowupGroup = values => dispatch =>
  api.post('/followup-groups', values).then(
    res => {
      dispatch(types.createFollowupGroup(res))
      showNotify('The Followup has been added')
    },
    res => {
      showNotify(
        typeof res.errors === 'string'
          ? res.errors
          : 'Sorry, adding Followup failed',
        'error'
      )
      throw res
    }
  )

export const getFollowupGroup = groupId =>
  api.get(`/followup-groups/${groupId}`)

export const updateFollowupGroup = (groupId, values) => dispatch =>
  api.put(`/followup-groups/${groupId}`, values).then(res => {
    dispatch(types.updateFollowupGroup(res))
    showNotify('The Followup has been updated')

    return res
  })

export const deleteFollowupGroup = groupId => dispatch =>
  api.del(`/followup-groups/${groupId}`).then(() => {
    dispatch(types.deleteFollowupGroup(groupId))
    showNotify('The Followup has been deleted')
  })

export const getScheduleFollowupGroups = params => dispatch =>
  api.get('/followup-groups/scheduled', params).then(res => {
    dispatch(types.getScheduleFollowupGroups(res))
  })
