import React from 'react'
import { useSelector } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { required, numericality } from 'redux-form-validators'

import { getIVRs } from 'store/ivr/reducer'
import InputField from 'components/forms/InputField'
import SelectField from 'components/forms/SelectField'
import CheckField from 'components/forms/CheckField'

const formSelector = formValueSelector('FollowUpForm')
const sourceOptions = [
  { text: 'Call', value: 'Call' },
  { text: 'Send SMS', value: 'SendSMS' },
  { text: 'Activate Voice', value: 'ActivateVoice' },
  { text: 'New Chat', value: 'NewChat' },
  { text: 'Send to Ytel', value: 'SendYtel' },
]

const assignOptions = [
  { text: 'No Agent', value: 'No' },
  { text: 'Random Agent', value: 'Random' },
]

interface Props {
  handleSubmit(action: any): any
}

const FollowUpForm: React.FC<Props> = props => {
  const { handleSubmit, children } = props
  const ivrs = useSelector(getIVRs)
  const type = useSelector(state => formSelector(state, 'type'))
  const leaveVoiceMail = useSelector(state =>
    formSelector(state, 'leaveVoiceMail')
  )

  return (
    <form className='with-label' onSubmit={handleSubmit}>
      <div className='form-group row'>
        <label className='col-sm-3 col-form-label'>Type</label>
        <div className='col-sm-9'>
          <Field
            component={SelectField}
            name='type'
            options={sourceOptions}
            validate={required()}
          />
        </div>
      </div>

      {(type === 'Call' || type === 'SendSMS' || type === 'SendYtel') && (
        <div className='form-group row'>
          <label className='col-sm-3 col-form-label'>Wait Time</label>
          <div className='col-sm-9 show-md-label'>
            <Field
              type='text'
              component={InputField}
              name='hours'
              label='Hours'
              validate={[
                required(),
                numericality({
                  int: true,
                  '>=': 0,
                  '<=': 24,
                  message: 'between 0-24',
                }),
              ]}
            />
            <Field
              type='text'
              component={InputField}
              name='minutes'
              label='Minutes'
              validate={[
                required(),
                numericality({
                  int: true,
                  '>=': 0,
                  '<=': 59,
                  message: 'between 0-59',
                }),
              ]}
            />
            <Field
              type='text'
              component={InputField}
              name='seconds'
              label='Seconds'
              validate={[
                required(),
                numericality({
                  int: true,
                  '>=': 0,
                  '<=': 59,
                  message: 'between 0-59',
                }),
              ]}
            />
          </div>
        </div>
      )}

      {(type === 'Call' || type === 'ActivateVoice') && (
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
      )}

      {type === 'Call' && (
        <React.Fragment>
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
        </React.Fragment>
      )}

      {type === 'SendSMS' && (
        <div className='form-group row'>
          <label className='col-sm-3 col-form-label'>Message</label>
          <div className='col-sm-9'>
            <Field
              type='textarea'
              component={InputField}
              name='mailText'
              label='Message Contents'
              validate={required()}
            />
          </div>
        </div>
      )}

      {type === 'NewChat' && (
        <React.Fragment>
          <div className='form-group row'>
            <label className='col-sm-3 col-form-label'>Chat Assignment</label>
            <div className='col-sm-9'>
              <Field
                component={SelectField}
                name='chatAssignment'
                options={assignOptions}
                validate={required()}
              />
            </div>
          </div>

          <div className='form-group row'>
            <label className='col-sm-3 col-form-label'>Message</label>
            <div className='col-sm-9'>
              <Field
                type='textarea'
                component={InputField}
                name='mailText'
                label='Message Contents'
              />
            </div>
          </div>
        </React.Fragment>
      )}

      {type === 'SendYtel' && (
        <div className='form-group row'>
          <label className='col-sm-3 col-form-label'>List ID</label>
          <div className='col-sm-9'>
            <Field
              type='text'
              component={InputField}
              name='mailText'
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
  form: 'FollowUpForm',
})(FollowUpForm)
