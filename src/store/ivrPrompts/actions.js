import * as api from 'utils/api'
import { showNotify } from 'utils/notify'

export const types = {
  IVR_PROMPT_GET: 'IVR_PROMPT_GET',
  IVR_PROMPT_CREATE: 'IVR_PROMPT_CREATE',
  IVR_PROMPT_UPDATE: 'IVR_PROMPT_UPDATE',
  IVR_PROMPT_DELETE: 'IVR_PROMPT_DELETE',
}

export const getIVRPrompts = IVRId => dispatch => api.get('/ivr-prompts', { IVRId }).then(res => {
  dispatch({
    type: types.IVR_PROMPT_GET,
    payload: res,
  })
})

export const createIVRPrompt = values => dispatch => api.post('/ivr-prompts', values).then(
  res => {
    dispatch({
      type: types.IVR_PROMPT_CREATE,
      payload: res,
    })
    // if (!res.audio) {
    //   showNotify('The converting text to the speech was failed', 'warning')
    // }
    showNotify('The prompt has been added')
  },
  res => {
    showNotify(
      typeof res.errors === 'string'
        ? res.errors
        : 'Sorry, adding prompt failed',
      'error',
    )
    throw res
  },
)

export const updateIVRPrompt = (promptId, values) => dispatch => api.put(`/ivr-prompts/${promptId}`, values).then(res => {
  dispatch({
    type: types.IVR_PROMPT_UPDATE,
    payload: res,
  })

  showNotify('The prompt has been updated')
})

export const updateIVRPromptAttributes = (
  promptId,
  values,
  reRender,
) => dispatch => api.put(`/ivr-prompts/${promptId}`, values).then(res => {
  if (reRender) {
    dispatch({
      type: types.IVR_PROMPT_UPDATE,
      payload: res,
    })
  }
})

export const deleteIVRPrompt = promptId => dispatch => api.del(`/ivr-prompts/${promptId}`).then(() => {
  dispatch({
    type: types.IVR_PROMPT_DELETE,
    payload: promptId,
  })
  showNotify('The prompt has been deleted')
})
