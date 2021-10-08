import { createActions } from 'redux-actions'
import * as api from 'utils/api'
import { showSpinner, hideSpinner } from 'store/app/actions'
import { showNotify } from 'utils/notify'

export const types = createActions(
  'GET_BLOCK_LISTS',
  'CREATE_BLOCK_LIST',
  'UPDATE_BLOCK_LIST',
  'DELETE_BLOCK_LIST'
)

export const getBlockLists = () => dispatch => {
  dispatch(showSpinner('blockLists'))
  return api
    .get(`/block-lists`)
    .then(res => {
      dispatch(types.getBlockLists(res))
    })
    .finally(() => {
      dispatch(hideSpinner('blockLists'))
    })
}

export const createBlockList = values => dispatch => {
  return api.post(`/block-lists`, values).then(res => {
    dispatch(types.createBlockList(res))
    showNotify('Blocked content has been added')
    return res
  })
}

export const updateBlockList = (id, values) => dispatch => {
  return api.put(`/block-lists/${id}`, values).then(res => {
    dispatch(types.updateBlockList(res))
    showNotify('Blocked content has been updated')
    return res
  })
}

export const deleteBlockList = id => dispatch => {
  return api.del(`/block-lists/${id}`).then(() => {
    dispatch(types.deleteBlockList(id))
    showNotify('Blocked content has been deleted')
  })
}
