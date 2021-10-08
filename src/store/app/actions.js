/* global FormData */
import * as api from 'utils/api'

export const types = {
  SHOW_SPINNER: 'LAYOUT_SHOW_SPINNER',
  HIDE_SPINNER: 'HIDE_SPINNER',
}

export const showSpinner = (id = 'app') => ({
  type: types.SHOW_SPINNER,
  payload: id,
})

export const hideSpinner = (id = 'app') => ({
  type: types.HIDE_SPINNER,
  payload: id,
})

export const uploadFile = (file, onProgress, container = 'default') => {
  const formData = new FormData()
  formData.append('file', file, file.name)

  return api.post(`/storage/${container}/upload`, formData, {
    onUploadProgress(progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      )
      onProgress(percentCompleted)
    },
  })
}
