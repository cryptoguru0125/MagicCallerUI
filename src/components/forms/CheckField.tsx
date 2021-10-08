import React from 'react'
import { MDBInput } from 'mdbreact'

import './CheckField.scss'

interface Props {
  input: {
    name: string
    value: any
    onChange(value: any): void
  }
  label?: string
}

const CheckField = (props: Props) => {
  const {
    input,
    label,
  } = props

  return (
    <div className="no-margin check-field">
      <MDBInput
        id={input.name}
        label={label}
        type="checkbox"
        checked={!!input.value}
        onChange={input.onChange}
      />
    </div>
  )
}

export default CheckField
