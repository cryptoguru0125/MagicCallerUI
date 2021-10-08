import React from 'react'
import { useSelector } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay'
import HashLoader from 'react-spinners/HashLoader'

import { getSpinner } from 'store/app/reducer'

interface Props {
  spinner: string
}

const ReduxLoadingOverlay: React.FC<Props> = ({ children, spinner }) => {
  const isLoading: boolean = useSelector(state => getSpinner(state, spinner))

  return (
    <LoadingOverlay
      active={isLoading}
      className='loading-overlay'
      background='transparent'
      spinner={<HashLoader color='#4285f4' />}
    >
      {children}
    </LoadingOverlay>
  )
}

export default ReduxLoadingOverlay
