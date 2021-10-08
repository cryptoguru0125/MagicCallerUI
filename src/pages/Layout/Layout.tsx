import React from 'react'

import Header from './Header'
import Footer from './Footer'
import './Layout.scss'

interface Props {
  innerComponent: any
  pageName: string
  routes: any[]
  user: User
}

class Layout extends React.PureComponent<Props & Dispatch> {
  render() {
    const InnerComponent = this.props.innerComponent

    return (
      <React.Fragment>
        <Header {...this.props} />
        <main>
          <InnerComponent {...this.props} />
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

export default Layout
