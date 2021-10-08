import React from 'react'
import { MDBIcon } from 'mdbreact'

import MessageField from './MessageField'

interface Props {
  fields: {
    map: any
    push(value: any): void
    remove(index: number): void
  }
  meta: {
    error?: string
  }
}

const MessageFieldArray = (props: Props) => {
  const {
    fields,
    meta: { error },
  } = props
  return (
    <div className='schedule-field-container'>
      {fields.map((member, index) => (
        <MessageField
          key={index}
          member={member}
          onDelete={() => {
            fields.remove(index)
          }}
        />
      ))}

      <div className='row'>
        <div className='col-md-9 offset-3'>
          <span
            role='button'
            onClick={() => {
              fields.push({})
            }}
          >
            <MDBIcon className='mr-1' icon='plus-circle' />
            Add Message Split Test
          </span>
        </div>
      </div>

      {error && <div className='invalid-feedback d-block'>{error}</div>}
    </div>
  )
}

export default MessageFieldArray
