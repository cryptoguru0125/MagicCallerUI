import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  reduxForm,
  Field,
  change as changeField,
  getFormValues,
} from 'redux-form'
import { required } from 'redux-form-validators'
import { MDBBtn, MDBInput } from 'mdbreact'

import { IntegrationPartner } from 'helpers/enum'
import { showNotify } from 'utils/notify'
import * as actions from 'store/integrations/actions'
import InputField from 'components/forms/InputField'
import SelectField from 'components/forms/SelectField'

const sourceOptions = [
  { text: 'Dialpad', value: 'Dialpad' },
  { text: 'Ytel', value: 'Ytel' },
  { text: 'Optimize', value: 'Optimize' },
]

const formSelector = getFormValues('IntegrationForm')

interface Props {
  isCreate: boolean
}

const IntegrationForm: React.FC<Props & FormProps> = props => {
  const dispatch = useDispatch()
  const { handleSubmit, isCreate } = props
  const formValue = useSelector(formSelector)
  const { partner } = formValue
  const isApiTested =
    partner === IntegrationPartner.OPTIMIZE || formValue.isApiTested

  const testAPI = () => {
    if (!formValue || !formValue.accountId || !formValue.apiKey) {
      showNotify('Account ID or API Key is missing', 'error')
      return
    }

    if (
      formValue.partner === IntegrationPartner.YTEL &&
      !formValue.accountName
    ) {
      showNotify('Account is missing', 'error')
      return
    }

    actions.testApiKey(formValue).then(
      office => {
        dispatch(changeField('IntegrationForm', 'accountName', office.name))
        dispatch(changeField('IntegrationForm', 'isApiTested', true))
      },
      () => {
        showNotify('API is invalid', 'error')
      }
    )
  }

  const setApiUntested = () => {
    dispatch(changeField('IntegrationForm', 'isApiTested', false))
  }

  return (
    <form className='with-label' onSubmit={handleSubmit}>
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
        <label className='col-md-2 col-form-label'>Partner</label>
        <div className='col-md-10'>
          <Field
            component={SelectField}
            name='partner'
            options={sourceOptions}
            validate={required()}
          />
        </div>
      </div>

      {partner === IntegrationPartner.YTEL && (
        <>
          <div className='form-group row'>
            <label className='col-md-2 col-form-label'>Account</label>
            <div className='col-md-10'>
              <Field
                type='text'
                component={InputField}
                name='accountName'
                label='Account'
                validate={required()}
                onChange={setApiUntested}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-md-2 col-form-label'>ListID</label>
            <div className='col-md-10'>
              <Field
                type='text'
                component={InputField}
                name='accountId'
                label='ListID'
                validate={required()}
                onChange={setApiUntested}
              />
            </div>
          </div>
        </>
      )}

      {partner === IntegrationPartner.DIALPAD && (
        <div className='form-group row'>
          <label className='col-md-2 col-form-label'>AccountID</label>
          <div className='col-md-10'>
            <Field
              type='text'
              component={InputField}
              name='accountId'
              label='Account ID'
              validate={required()}
              onChange={setApiUntested}
            />
          </div>
        </div>
      )}

      <div className='form-group row'>
        <label className='col-md-2 col-form-label'>API Key</label>
        <div className='col-md-10'>
          <Field
            type='text'
            component={InputField}
            name='apiKey'
            label='API Key'
            validate={required()}
            onChange={setApiUntested}
          />
        </div>
      </div>

      <div className='button-row'>
        {isApiTested ? (
          <MDBInput
            label='Tested'
            type='checkbox'
            id='checkbox1'
            checked={true}
            disabled={true}
          />
        ) : (
          <MDBBtn type='button' onClick={testAPI}>
            Test API
          </MDBBtn>
        )}

        {isCreate ? (
          <MDBBtn type='submit' color='primary' disabled={!isApiTested}>
            Create
          </MDBBtn>
        ) : (
          <MDBBtn type='submit' color='success' disabled={!isApiTested}>
            Update
          </MDBBtn>
        )}
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'IntegrationForm',
})(IntegrationForm)
