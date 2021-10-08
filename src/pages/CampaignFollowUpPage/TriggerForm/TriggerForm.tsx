import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from 'redux-form-validators'

import SelectField from 'components/forms/SelectField'
import CheckField from 'components/forms/CheckField'

const sourceOptions = [
  { text: 'None', value: 'Default' },
  { text: 'Inbound Call', value: 'InboundCall' },
  { text: 'Inbound SMS', value: 'InboundSMS' },
]

type Props = {
  handleSubmit(action: any): any
}

const TriggerForm: React.FC<Props> = props => {
  const { handleSubmit, children } = props

  return (
    <form className="with-label" onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Type</label>
        <div className="col-sm-9">
          <Field
            component={SelectField}
            name="type"
            options={sourceOptions}
            validate={required()}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-3 col-form-label mt-2">Segments</label>
        <div className="col-sm-9">
          <Field
            component={CheckField}
            name="knownOnly"
            label="Only Known Customers"
            validate={required()}
          />
        </div>
      </div>

      {children}
    </form>
  )
}

export default reduxForm({
  form: 'TriggerForm',
})(TriggerForm)
