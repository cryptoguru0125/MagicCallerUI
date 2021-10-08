import React from 'react'
import { MDBBtn } from 'mdbreact'

import ScheduleField from './ScheduleField'
import './ScheduleFieldArray.scss'

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

const ScheduleFieldArray = (props: Props) => {
  const {
    fields,
    meta: { error },
  } = props
  return (
    <div className='schedule-field-container'>
      {fields.map((member, index) => (
        <ScheduleField
          key={index}
          member={member}
          onDelete={() => {
            fields.remove(index)
          }}
        />
      ))}

      <div className='md-form mb-0'>
        <MDBBtn
          className='ml-0'
          color='white'
          size='sm'
          onClick={() => {
            fields.push({})
          }}
        >
          Add
        </MDBBtn>
      </div>

      {error && <div className='invalid-feedback d-block'>{error}</div>}
    </div>
  )
}

export default ScheduleFieldArray
