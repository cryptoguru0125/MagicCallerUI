import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from 'redux-form-validators'

import InputField from 'components/forms/InputField'
import SelectField from 'components/forms/SelectField'

const blockOptions = [
  { text: 'Email', value: 'Email' },
  { text: 'Phone', value: 'Phone' },
]

interface Props {
  isCreate: boolean
}

const BlockListForm: React.FC<Props & FormProps> = props => {
  const { handleSubmit, isCreate, children } = props

  return (
    <form className='with-label' onSubmit={handleSubmit}>
      <div className='form-group row'>
        <label className='col-md-2 col-form-label'>Block Type</label>
        <div className='col-md-10'>
          <Field
            component={SelectField}
            name='type'
            options={blockOptions}
            validate={required()}
          />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-md-2 col-form-label'>Block Content</label>
        <div className='col-md-10'>
          <Field
            type={isCreate ? 'textarea' : 'text'}
            component={InputField}
            name='content'
            label='Content'
            validate={[required()]}
          />
        </div>
      </div>

      {children}
    </form>
  )
}

export default reduxForm({
  form: 'BlockListForm',
})(BlockListForm)
