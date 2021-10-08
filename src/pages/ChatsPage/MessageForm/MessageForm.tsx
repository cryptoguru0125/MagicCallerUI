import React, { useState } from 'react'
import { MDBBtn } from 'mdbreact'

interface Props {
  onSend(message: string): void
}

const MessageForm: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState('')

  const handleChange = e => {
    setMessage(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13 && message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  const sendMessage = () => {
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <div className="input-group">
      <input
        type="text"
        autoFocus
        className="form-control"
        placeholder="Type message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className="input-group-append">
        <MDBBtn
          color="primary"
          className="m-0 px-3 py-2 z-depth-0"
          onClick={sendMessage}
        >
          Send
        </MDBBtn>
      </div>
    </div>
  )
}

export default MessageForm
