import React from 'react'
import Layout from './Layout'

export function withLayout(pageName, InnerComponent) {
  return props => (
    <Layout {...props} pageName={pageName} innerComponent={InnerComponent} />
  )
}

export default Layout
