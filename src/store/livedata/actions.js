import { createActions } from 'redux-actions'

export const types = createActions('SET_LIVE_DATA')

export const setLiveData = (key, value) => types.setLiveData({ key, value })
