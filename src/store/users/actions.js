import { createActions } from 'redux-actions'
import * as api from 'utils/api'
import { showNotify } from 'utils/notify'
import { showSpinner, hideSpinner } from 'store/app/actions'

export const types = createActions(
  'GET_USER_AGENTS',
  'CREATE_USER',
  'UPDATE_USER',
  'DELETE_USER',
)

export const getUserAgents = () => dispatch => {
  dispatch(showSpinner('getUserAgents'))
  return api
    .get('/users/agents')
    .then(res => {
      dispatch(types.getUserAgents(res))
    })
    .finally(() => {
      dispatch(hideSpinner('getUserAgents'))
    })
}

export const createUser = values => dispatch => api
  .post('/users', values)
  .then(res => {
    dispatch(types.createUser(res))
    showNotify('Agent has been created')
  })
  .catch(res => {
    showNotify(
      res.email
        ? 'Sorry, email already exists'
        : 'Sorry, failed on creating user',
      'error',
    )
  })

export const updateUser = (userId, values) => dispatch => api
  .put(`/users/${userId}`, values)
  .then(res => {
    dispatch(types.updateUser(res))
    showNotify('Agent has been updated')
  })
  .catch(res => {
    showNotify(
      res.email
        ? 'Sorry, email already exists'
        : 'Sorry, failed on updating user',
      'error',
    )
  })

export const deleteUser = userId => dispatch => api.del(`/users/${userId}`).then(() => {
  dispatch(types.deleteUser(userId))
  showNotify('Agent has been removed')
})
