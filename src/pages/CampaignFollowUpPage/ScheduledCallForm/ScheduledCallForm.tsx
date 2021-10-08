import React from 'react'
import { useSelector } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { required } from 'redux-form-validators'
import { MDBBtn } from 'mdbreact'

import { getIVRs } from 'store/ivr/reducer'
import InputField from 'components/forms/InputField'
import SelectField from 'components/forms/SelectField'
import CheckField from 'components/forms/CheckField'

const formSelector = formValueSelector('ScheduledCallForm')

interface Props {
  isCreate: boolean
}

const ScheduledCallForm: React.FC<Props & FormProps> = props => {
  const { isCreate, handleSubmit, children } = props
  const ivrs = useSelector(getIVRs)
  const leaveVoiceMail = useSelector(state =>
    formSelector(state, 'leaveVoiceMail')
  )

  return (
    <form className='with-label' onSubmit={handleSubmit}>
      <div className='form-group row'>
        <label className='col-sm-3 col-form-label'>IVR</label>
        <div className='col-sm-9'>
          <Field
            component={SelectField}
            name='IVRId'
            options={ivrs}
            labelKey='name'
            valueKey='id'
            validate={required()}
          />
        </div>
      </div>

      <div className='form-group row'>
        <div className='col-sm-9 offset-sm-3'>
          <Field
            component={CheckField}
            name='leaveVoiceMail'
            label='Leave voice mail'
          />
        </div>
      </div>

      {!!leaveVoiceMail && (
        <div className='form-group row'>
          <label className='col-sm-3 col-form-label'>Voice Mail</label>
          <div className='col-sm-9'>
            <Field
              type='textarea'
              component={InputField}
              name='mailText'
              label='Voice Mail'
              validate={required()}
            />
          </div>
        </div>
      )}

      <div className='button-row'>
        {isCreate ? (
          <MDBBtn type='submit' color='primary'>
            Add Sequence
          </MDBBtn>
        ) : (
          <MDBBtn type='submit' color='success'>
            Update Sequence
          </MDBBtn>
        )}
        {children}
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'ScheduledCallForm',
})(ScheduledCallForm)
