import React from 'react'
import { useSelector } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { required } from 'redux-form-validators'

import { TransferSource } from 'helpers/enum'
import { selectTransferableIntegrations } from 'store/integrations/reducer'
import InputField from 'components/forms/InputField'
import SelectField from 'components/forms/SelectField'
import PhoneField from 'components/forms/PhoneField'

interface Props {
  source: string
  agents: Agent[]
  handleSubmit(): any
}

const sourceOptions = [
  { text: 'Manual', value: 'Manual' },
  { text: 'Internal Agents', value: 'Internal Agents' },
]

const TransferNumberForm: React.FC<Props & Dispatch> = props => {
  const { agents, handleSubmit, children, source } = props
  const transferable = useSelector(selectTransferableIntegrations)
  const integrations = [{ name: 'None', id: '' }, ...transferable]

  return (
    <form className='with-label' onSubmit={handleSubmit}>
      {source === 'Manual' && (
        <div className='form-group row'>
          <label className='col-md-4 col-form-label'>Name</label>
          <div className='col-md-8'>
            <Field
              type='text'
              component={InputField}
              name='name'
              label='Name'
              validate={required()}
            />
          </div>
        </div>
      )}

      <div className='form-group row'>
        <label className='col-md-4 col-form-label'>Number Source</label>
        <div className='col-md-8'>
          <Field
            component={SelectField}
            name='source'
            options={sourceOptions}
          />
        </div>
      </div>

      {source === TransferSource.MANUAL ? (
        <div className='form-group row'>
          <label className='col-md-4 col-form-label'>Manual #</label>
          <div className='col-md-8'>
            <Field component={PhoneField} name='phone' validate={required()} />
          </div>
        </div>
      ) : (
        <div className='form-group row'>
          <label className='col-md-4 col-form-label'>Agent</label>
          <div className='col-md-8'>
            <Field
              component={SelectField}
              name='AgentId'
              options={agents}
              labelKey='name'
              valueKey='id'
              validate={required()}
            />
          </div>
        </div>
      )}

      <div className='form-group row'>
        <label className='col-md-4 col-form-label'>Sync to Integration</label>
        <div className='col-md-8'>
          <Field
            component={SelectField}
            name='IntegrationId'
            options={integrations}
            labelKey='name'
            valueKey='id'
          />
        </div>
      </div>

      {children}
    </form>
  )
}

export default reduxForm({
  form: 'TransferNumberForm',
})(TransferNumberForm)
