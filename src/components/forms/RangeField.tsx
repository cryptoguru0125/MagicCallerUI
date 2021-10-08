import React from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/src/scss/index.scss'
import './RangeField.scss'

interface Props {
  input: {
    value: any
    onChange(value: any): void
  }
  min?: number
  max?: number
}

const RangeField = (props: Props) => {
  const { input, min, max } = props

  return (
    <div className="no-margin range-field">
      <InputRange
        maxValue={max}
        minValue={min}
        value={input.value}
        onChange={input.onChange}
      />
    </div>
  )
}

RangeField.defaultProps = {
  min: 0,
  max: 100,
}

export default RangeField
