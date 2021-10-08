import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from 'redux-form-validators'

import InputField from 'components/forms/InputField'
import SelectField from 'components/forms/SelectField'

const typeOptions = [
  { text: 'Standard', value: 'Default' },
  { text: 'Schedule', value: 'Schedule' },
]

interface Props {
  isEdit?: boolean
}

const FollowupGroupForm: React.FC<Props & FormProps> = props => {
  const { isEdit, handleSubmit, children } = props

  return (
    <form className='with-label' onSubmit={handleSubmit}>
      <div className='form-group row'>
        <label className='col-sm-3 col-form-label'>Name</label>
        <div className='col-sm-9 show-md-label'>
          <Field
            type='text'
            component={InputField}
            name='name'
            validate={[required()]}
          />
        </div>
      </div>

      {!isEdit && (
        <div className='form-group row'>
          <label className='col-sm-3 col-form-label'>Type</label>
          <div className='col-sm-9'>
            <Field
              component={SelectField}
              name='type'
              options={typeOptions}
              validate={required()}
            />
          </div>
        </div>
      )}

      {children}
    </form>
  )
}

export default reduxForm({
  form: 'FollowupGroupForm',
})(FollowupGroupForm)
