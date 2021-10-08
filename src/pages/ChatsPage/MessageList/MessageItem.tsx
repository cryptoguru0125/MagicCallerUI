import React from 'react'

import { formatDate } from 'utils'
import classes from './MessageItem.module.scss'

interface Props {
  message: Message
  right: boolean
}
const MessageItem: React.FC<Props> = ({ message, right }) => (
  <div
    className={`${classes.container} ${right ? classes.right : classes.left}`}
  >
    <div className={classes.time}>
      {formatDate(message.createdAt, 'MM/DD/YYYY h:mm A')}
    </div>
    <div className={classes.bubble}>{message.content}</div>
  </div>
)

export default MessageItem
