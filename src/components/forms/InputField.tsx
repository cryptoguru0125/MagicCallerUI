import React from 'react'
import { MDBInput } from 'mdbreact'

interface Props {
  type: string
  disabled?: boolean
  icon: string
  input: {
    value: any
    onChange(value: any): void
  }
  label?: string
  meta: {
    asyncValidating: boolean
    error: string
    touched: boolean
  }
}

const InputField = (props: Props) => {
  const {
    disabled,
    type,
    icon,
    input,
    label,
    meta: { asyncValidating, touched, error },
  } = props

  let validClass = ''
  if (touched && error) {
    validClass = 'is-invalid'
  } else if (touched) {
    validClass = 'is-valid'
  }

  return (
    <div className="no-margin input-field">
      <MDBInput
        type={type}
        icon={icon}
        label={label}
        className={validClass}
        disabled={disabled}
        value={typeof input.value === 'number' ? `${input.value}` : input.value}
        onChange={input.onChange}
      >
        {asyncValidating && (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <div className="invalid-feedback">{error}</div>
      </MDBInput>
    </div>
  )
}

InputField.defaultProps = {
  icon: null,
  type: 'text',
  disabled: false,
}

export default InputField
