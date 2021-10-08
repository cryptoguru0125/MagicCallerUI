import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from 'redux-form-validators'

import InputField from 'components/forms/InputField'

interface Props {
  handleSubmit(): any
}

const TransferOptionForm: React.FC<Props> = props => {
  const { handleSubmit, children } = props

  return (
    <form className="with-label" onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-md-2 col-form-label">Name</label>
        <div className="col-md-10">
          <Field
            type="text"
            component={InputField}
            name="name"
            label="Name"
            validate={required()}
          />
        </div>
      </div>

      {children}
    </form>
  )
}

export default reduxForm({
  form: 'TransferOptionForm',
})(TransferOptionForm)
