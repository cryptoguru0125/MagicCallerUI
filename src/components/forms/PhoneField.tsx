import React from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './PhoneField.scss'

interface Props {
  input: any
  country?: string
  placeholder?: string
  meta: {
    error: string
    touched: boolean
  }
}

const PhoneField = (props: Props) => {
  const {
    input,
    country,
    placeholder,
    meta: { touched, error },
  } = props

  return (
    <div className="md-form phone-field">
      <PhoneInput
        {...input}
        country={country}
        placeholder={placeholder}
        autoComplete="off"
      />
      {touched && error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </div>
  )
}

PhoneField.defaultProps = {
  country: 'US',
  placeholder: 'Enter phone number',
}

export default PhoneField
