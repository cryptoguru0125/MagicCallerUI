import React from 'react'
import numeral from 'numeral'

interface Props {
  input: any
  min?: number
  max?: number
  step?: number
}

const SliderField = (props: Props) => {
  const {
    min, max, input, step,
  } = props

  return (
    <div className="md-form range-field pt-1">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={input.value}
        onChange={input.onChange}
      />
      <div>
        <small>{numeral(input.value).format('0.00')}</small>
      </div>
    </div>
  )
}

SliderField.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
}

export default SliderField
