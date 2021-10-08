import React from 'react'
import { useSelector } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { required } from 'redux-form-validators'

import { selectFollowupGroups } from 'store/followupGroups/reducer'
import SelectField from 'components/forms/SelectField'

type Props = {
  handleSubmit(onSubmit: any): any
}

const InteractionForm: React.FC<Props> = props => {
  const { handleSubmit, children } = props
  const followupGroups = useSelector(selectFollowupGroups)

  return (
    <form className="with-label" onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-md-3 col-form-label">Followup</label>
        <div className="col-md-9">
          <Field
            component={SelectField}
            name="followupId"
            options={followupGroups}
            labelKey="name"
            valueKey="id"
            validate={required()}
          />
        </div>
      </div>

      {children}
    </form>
  )
}

export default reduxForm({
  form: 'InteractionForm',
})(InteractionForm)
