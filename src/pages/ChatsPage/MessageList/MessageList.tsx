import React from 'react'
import { useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'

import { selectMessages } from 'store/messages/reducer'
import ReduxLoadingOverlay from 'components/ReduxLoadingOverlay'
import MessageItem from './MessageItem'

const MessageList = () => {
  const messages: Message[] = useSelector(selectMessages)

  return (
    <ReduxLoadingOverlay spinner="messages">
      <Scrollbars autoHide={true} style={{ width: '100%', height: '100%' }}>
        {messages.map(item => (
          <MessageItem key={item.id} message={item} right={item.sent} />
        ))}
      </Scrollbars>
    </ReduxLoadingOverlay>
  )
}

export default MessageList
