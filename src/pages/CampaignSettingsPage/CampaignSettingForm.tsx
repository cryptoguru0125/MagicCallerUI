import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { required } from 'redux-form-validators'
import { MDBBtn } from 'mdbreact'
import JSONPretty from 'react-json-pretty'

import CopyText from 'components/CopyText'
import InputField from 'components/forms/InputField'
import ScheduleFieldArray from 'components/forms/ScheduleFieldArray'

interface Props {
  campaign: Campaign
  handleSubmit(onSubmit: any): any
}

const arrayValidate = values =>
  values && !values.length ? 'Required' : undefined

const CampaignSettingForm = ({ campaign, handleSubmit }: Props) => {
  const postingSpecs = {
    firstName: '[firstName]',
    lastName: '[lastName]',
    email: '[optional]',
    phone: '[10 digit phone]',
    zipCode: '[zip code]',
    age: '[age]',
    optimizeID: '[optional]',
    followupId: '[Followup id]',
    token: '[token below]',
  }

  return (
    <form className='with-label campaign-setting-form' onSubmit={handleSubmit}>
      <div className='form-group row'>
        <label className='col-md-2 col-form-label'>Name</label>
        <div className='col-md-10'>
          <Field
            type='text'
            component={InputField}
            name='name'
            label='Name'
            validate={required()}
          />
        </div>
      </div>

      <div className='form-group row'>
        <label className='col-md-2 col-form-label'>Schedule</label>
        <div className='col-md-10'>
          <FieldArray
            component={ScheduleFieldArray}
            name='schedules'
            validate={[required(), arrayValidate]}
          />
        </div>
      </div>

      <div className='form-group row mt-3'>
        <label className='col-md-2 col-form-label mt-0'>Posting URL</label>
        <div className='col-md-10'>
          <CopyText text={`${window.location.origin}/api/leads`} />
        </div>
      </div>

      <div className='form-group row mt-3'>
        <label className='col-md-2 col-form-label mt-0'>Posting Specs</label>
        <div className='col-md-10'>
          <JSONPretty data={postingSpecs} />
        </div>
      </div>

      <div className='form-group row mt-3'>
        <label className='col-md-2 col-form-label mt-0'>Token</label>
        <div className='col-md-10'>
          <CopyText text={campaign.token} />
        </div>
      </div>

      <div className='form-group row mt-3'>
        <div className='col-md-10 offset-md-2'>
          <MDBBtn type='submit' color='primary'>
            Update Settings
          </MDBBtn>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'CampaignSettingForm',
})(CampaignSettingForm)
