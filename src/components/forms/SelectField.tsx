import React from 'react'
import { MDBSelect } from 'mdbreact'
import classnames from 'classnames'

import './SelectField.scss'

interface Props {
  labelKey?: string
  valueKey?: string
  label?: string
  options: Array<{
    value: any
    text: string
  }>
  hideLabelActive?: boolean
  multiple?: boolean
  input: {
    value: any
    onChange(value: any): void
  }
  meta: {
    touched: boolean
    error: string
    warning: string
  }
}

class SelectField extends React.Component<Props> {
  static defaultProps = {
    label: '',
    multiple: false,
    hideLabelActive: false,
    labelKey: 'text',
    valueKey: 'value',
    options: [],
  }

  formatOptions = options => {
    if (!options) {
      return []
    }

    const { valueKey, labelKey } = this.props

    return options.map(item => ({
      text: item[labelKey],
      value: item[valueKey],
    }))
  }

  getValue = value => {
    const {
      input: { onChange },
    } = this.props
    onChange(value[0])
  }

  render() {
    const {
      label,
      input,
      multiple,
      hideLabelActive,
      meta: { touched, error },
      options,
    } = this.props

    const formattedOptions = this.formatOptions(options)

    const selectedOption = formattedOptions.find(
      option => `${option.value}` === `${input.value}`
    )
    const updatedOptions = formattedOptions.map(option => ({
      ...option,
      checked: option.value === input.value,
    }))

    return (
      <div
        className={classnames('select-container', 'no-margin', {
          'hide-label-active': hideLabelActive,
        })}
      >
        <MDBSelect
          selected={selectedOption ? selectedOption.text : label}
          getValue={this.getValue}
          options={updatedOptions}
          multiple={multiple}
          label={label}
        />
        {error && touched && (
          <div className='invalid-feedback d-block'>{error}</div>
        )}
      </div>
    )
  }
}

export default SelectField
