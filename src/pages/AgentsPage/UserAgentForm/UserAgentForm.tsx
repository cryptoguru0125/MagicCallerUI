import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required, email } from 'redux-form-validators'

import InputField from 'components/forms/InputField'

class UserAgentForm extends React.Component<FormProps> {
  render() {
    const { children, handleSubmit } = this.props

    return (
      <form
        className="with-label"
        onSubmit={handleSubmit}
        autoComplete="off"
        autoCorrect="off"
      >
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

        <div className="form-group row">
          <label className="col-md-2 col-form-label">Email</label>
          <div className="col-md-10">
            <Field
              type="email"
              component={InputField}
              name="email"
              validate={[required(), email()]}
            />
          </div>
        </div>

        {children}
      </form>
    )
  }
}

export default reduxForm({
  form: 'UserAgentForm',
})(UserAgentForm)
