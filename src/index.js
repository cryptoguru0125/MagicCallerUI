/* global document */
import React from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { getProfile } from 'store/profile/actions'
import { getToken } from 'utils/storage'
import buildStore from './store'
import './scss/app.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory({})
const store = buildStore(history, {})

if (getToken()) {
  store.dispatch(getProfile())
}

const renderApp = Component => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  )
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const newApp = require('./App').default
    renderApp(newApp)
  })
}

renderApp(App)
serviceWorker.unregister()
