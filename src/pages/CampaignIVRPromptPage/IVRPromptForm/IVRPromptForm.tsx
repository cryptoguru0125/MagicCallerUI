import React from 'react'
import classNames from 'classnames'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { required } from 'redux-form-validators'
import { MDBBtn } from 'mdbreact'

import InputField from 'components/forms/InputField'
import CheckField from 'components/forms/CheckField'
import MessageFieldArray from './MessageFieldArray'

interface Props {
  handleSubmit(onSubmit: any): any
  isCreate: boolean
  submitting: boolean
}

const IVRPromptForm: React.FC<Props> = ({
  children,
  handleSubmit,
  isCreate,
  submitting,
}) => (
  <form
    className={classNames('with-label', { submitting })}
    onSubmit={handleSubmit}
  >
    <div className='form-group row'>
      <label className='col-md-3 col-form-label'>Name</label>
      <div className='col-md-9'>
        <Field
          type='text'
          component={InputField}
          name='name'
          label='Name'
          validate={required()}
        />
      </div>
    </div>

    <div>
      <FieldArray
        component={MessageFieldArray}
        name='messages'
        validate={required()}
      />
    </div>

    <div className='form-group row'>
      <div className='col-sm-9 offset-sm-3'>
        <Field component={CheckField} name='first' label='First Sequence' />
      </div>
    </div>

    <div className='button-row'>
      {isCreate ? (
        <MDBBtn type='submit' color='primary' disabled={submitting}>
          Add IVR Prompt
        </MDBBtn>
      ) : (
        <MDBBtn type='submit' color='success' disabled={submitting}>
          Update IVR Prompt
        </MDBBtn>
      )}

      {children}
    </div>
  </form>
)

export default reduxForm({
  form: 'IVRPromptForm',
})(IVRPromptForm)
