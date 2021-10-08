/* global document, window, FormData */
import { Promise } from 'es6-promise'
import * as axios from 'axios'
import qs from 'qs'

import { getToken, clearInfo } from './storage'

export const SITE_URL = '/'
export const API_URL = '/api'

const requestConfig = {
  headers: {
    'Content-Type': 'text/plain',
  },
}

const requestConfigJSON = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const requestConfigFormData = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

const setAuthHeaders = (hdr = {}) => {
  const headers = hdr
  const token = getToken()
  if (token) {
    headers.Authorization = token
  }

  return headers
}

const transformURL = endpoint => `${API_URL}${endpoint}`
const withPromise = axiosInstance => new Promise((resolve, reject) => {
  axiosInstance.then(
    res => {
      resolve(res.data)
    },
    err => {
      // service is unavailable
      if (!err.response) {
        reject(new Error({ status: 503, error: 'Service is unavailable' }))
        return
      }

      if (err.response.status === 403) {
        // redirect to the homepage if permission is denied
        document.location = '/'
      } else if (
      // redirect to login page if user is not authenticated
        err.response.status === 401
          && window.location.pathname.indexOf('/login') === -1
      ) {
        // clear user from storage
        clearInfo()
        // redirect
        document.location = '/login'
      }

      // general error
      reject(
        Object.assign(err.response.data || {}, {
          status: err.response.status,
        }),
      )
    },
  )
})

export function create(config) {
  return withPromise(
    axios({
      ...config,
      url: transformURL(config.url),
    }),
  )
}

export function get(endpoint, query) {
  const config = requestConfig

  setAuthHeaders(config.headers)

  let url = transformURL(endpoint)
  if (query) url += `?${qs.stringify(query)}`

  return withPromise(axios.get(url, config))
}

export function post(endpoint, body, config = {}) {
  config = Object.assign(config, requestConfig)

  let requestBody = body

  if (body instanceof FormData) {
    config = Object.assign(config, requestConfigFormData)
  } else if (typeof body === 'object') {
    config = Object.assign(config, requestConfigJSON)
    requestBody = JSON.stringify(body)
  }

  setAuthHeaders(config.headers)

  return withPromise(axios.post(transformURL(endpoint), requestBody, config))
}

export function patch(endpoint, body) {
  let config = requestConfig
  let requestBody = body

  if (body instanceof FormData) {
    config = Object.assign(config, requestConfigFormData)
  } else if (typeof body === 'object') {
    config = Object.assign(config, requestConfigJSON)
    requestBody = JSON.stringify(body)
  }

  setAuthHeaders(config.headers)

  return withPromise(axios.patch(transformURL(endpoint), requestBody, config))
}

export function put(endpoint, body) {
  let config = requestConfig
  let requestBody = body

  if (body instanceof FormData) {
    config = Object.assign(config, requestConfigFormData)
  } else if (typeof body === 'object') {
    config = Object.assign(config, requestConfigJSON)
    requestBody = JSON.stringify(body)
  }

  setAuthHeaders(config.headers)

  return withPromise(axios.put(transformURL(endpoint), requestBody, config))
}

export function del(endpoint) {
  const config = requestConfig

  setAuthHeaders(config.headers)

  return withPromise(axios.delete(transformURL(endpoint), config))
}
