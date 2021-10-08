import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { required } from 'redux-form-validators'

import SelectField from 'components/forms/SelectField'

const sourceOptions = [{ text: 'Twilio', value: 'Twilio' }]

class NumberForm extends React.Component {
  render() {
    const { twilioNumbers, handleSubmit, children } = this.props

    return (
      <form className="with-label" onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-md-2 col-form-label">Source</label>
          <div className="col-md-10">
            <Field
              type="text"
              component={SelectField}
              name="source"
              label="Source"
              options={sourceOptions}
              validate={required()}
              hideLabelActive
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-md-2 col-form-label">Number</label>
          <div className="col-md-10">
            <Field
              type="text"
              component={SelectField}
              name="number"
              options={twilioNumbers}
              labelKey="phoneNumber"
              valueKey="phoneNumber"
              validate={required()}
            />
          </div>
        </div>

        {children}
      </form>
    )
  }
}

NumberForm.propTypes = {
  twilioNumbers: PropTypes.arrayOf(
    PropTypes.shape({
      phoneNumber: PropTypes.string,
    }),
  ),
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default reduxForm({
  form: 'NumberForm',
})(NumberForm)
