import React from 'react'
import { useSelector } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { selectAgentUsers } from 'store/users/reducer'
import SelectField from 'components/forms/SelectField'

type Props = {
  handleSubmit(action: any): any
}

const AgentAssignForm: React.FC<Props> = props => {
  const { handleSubmit, children } = props
  const userAgents = useSelector(selectAgentUsers)
  const withNone = [{ id: '', fullName: 'None' }, ...userAgents]

  return (
    <form className="with-label" onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Agent</label>
        <div className="col-sm-9">
          <Field
            component={SelectField}
            name="UserId"
            labelKey="fullName"
            valueKey="id"
            options={withNone}
          />
        </div>
      </div>

      {children}
    </form>
  )
}

export default reduxForm({
  form: 'AgentAssignForm',
})(AgentAssignForm)
