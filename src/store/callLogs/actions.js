import * as api from 'utils/api'

export const types = {
  CALL_LOG_GET: 'CALL_LOG_GET',
}

export const getCallLogs = values => dispatch => api.get('/call-logs', values).then(res => {
  dispatch({
    type: types.CALL_LOG_GET,
    payload: res,
  })
})
