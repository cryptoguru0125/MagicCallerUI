import React from 'react'

type Props = {
  className?: string
  input: any
  meta: {
    touched: boolean
    error: string
  }
}

const TextAreaField: React.FC<Props> = props => {
  const {
    input,
    meta: { touched, error },
  } = props

  let status = ''
  if (touched && error) {
    status = 'has-error'
  } else if (touched) {
    status = 'has-success'
  }

  return (
    <div className={`control ${status}`}>
      <textarea {...input} {...props} autoComplete="off" />
    </div>
  )
}

TextAreaField.defaultProps = {
  className: 'form-control',
}

export default TextAreaField
