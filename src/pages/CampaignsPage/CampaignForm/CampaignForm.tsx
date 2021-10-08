import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { required } from 'redux-form-validators'

import InputField from 'components/forms/InputField'
import ScheduleFieldArray from 'components/forms/ScheduleFieldArray'

const arrayValidate = values => values && !values.length ? 'Required' : undefined

type Props = {
  handleSubmit(onSubmit: any): any
}

const CampaignForm: React.FC<Props> = props => {
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

      <div className="form-group row">
        <label className="col-md-2 col-form-label">Schedule</label>
        <div className="col-md-10">
          <FieldArray
            component={ScheduleFieldArray}
            name="schedules"
            validate={[required(), arrayValidate]}
          />
        </div>
      </div>

      {children}
    </form>
  )
}

export default reduxForm({
  form: 'CampaignForm',
})(CampaignForm)
