import * as api from 'utils/api'
import { showNotify } from 'utils/notify'
import { showSpinner, hideSpinner } from 'store/app/actions'

export const types = {
  FOLLOWUP_GET: 'FOLLOWUP_GET',
  FOLLOWUP_CREATE: 'FOLLOWUP_CREATE',
  FOLLOWUP_UPDATE: 'FOLLOWUP_UPDATE',
  FOLLOWUP_DELETE: 'FOLLOWUP_DELETE',
}

export const getFollowUps = params => dispatch => {
  dispatch(showSpinner('followups'))
  return api
    .get('/follow-ups', params)
    .then(res => {
      dispatch({
        type: types.FOLLOWUP_GET,
        payload: res,
      })
    })
    .finally(() => {
      dispatch(hideSpinner('followups'))
    })
}

export const createFollowUp = values => dispatch =>
  api.post('/follow-ups', values).then(
    res => {
      dispatch({
        type: types.FOLLOWUP_CREATE,
        payload: res,
      })
      showNotify('The Sequence has been added')
    },
    res => {
      showNotify(
        typeof res.errors === 'string'
          ? res.errors
          : 'Sorry, adding Sequence failed',
        'error'
      )
      throw res
    }
  )

export const updateFollowUp = (followUpId, values) => dispatch =>
  api.put(`/follow-ups/${followUpId}`, values).then(res => {
    dispatch({
      type: types.FOLLOWUP_UPDATE,
      payload: res,
    })
    showNotify('The Sequence has been updated')
  })

export const deleteFollowUp = followUpId => dispatch =>
  api.del(`/follow-ups/${followUpId}`).then(() => {
    dispatch({
      type: types.FOLLOWUP_DELETE,
      payload: followUpId,
    })
    showNotify('The Sequence has been deleted')
  })

export const updateOrder = followups => dispatch => {
  dispatch({
    type: types.FOLLOWUP_GET,
    payload: followups,
  })

  const data = followups.map(item => ({
    id: item.id,
    order: item.order,
  }))

  return api.post('/follow-ups/update-order', data)
}
