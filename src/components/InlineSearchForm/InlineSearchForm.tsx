import React from 'react'
import { MDBBtn, MDBFormInline } from 'mdbreact'
import { reduxForm, Field } from 'redux-form'

const InlineSearchForm: React.FC<FormProps> = ({
  handleSubmit,
  submitting,
}) => (
  <MDBFormInline className='md-form my-0' onSubmit={handleSubmit}>
    <Field
      type='text'
      component='input'
      className='form-control mr-sm-2'
      name='query'
      placeholder='Search'
      aria-label='Search'
    />

    <MDBBtn
      type='submit'
      gradient='aqua'
      rounded={true}
      size='sm'
      className='mr-auto'
      disabled={submitting}
    >
      Search
    </MDBBtn>
  </MDBFormInline>
)

export default reduxForm({
  form: 'InlineSearchForm',
})(InlineSearchForm)
