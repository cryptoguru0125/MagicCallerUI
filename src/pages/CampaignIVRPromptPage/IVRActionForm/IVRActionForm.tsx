import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { required } from 'redux-form-validators'
import { MDBBtn } from 'mdbreact'

import { PromptTypes } from 'helpers/enum'
import { getTransferOptions } from 'store/transferOptions/reducer'
import SelectField from 'components/forms/SelectField'
import InputField from 'components/forms/InputField'

interface Props {
  handleSubmit(onSubmit: any): any
  isCreate: boolean
  submitting: boolean
}

const selector = formValueSelector('IVRActionForm')
const typeOptions = [
  { id: PromptTypes.TRANSFER },
  { id: PromptTypes.REMOVE },
  { id: PromptTypes.END_CALL },
]

const IVRActionForm: React.FC<Props> = ({
  children,
  handleSubmit,
  isCreate,
  submitting,
}) => {
  const transferOptions = useSelector(state => getTransferOptions(state))
  const type = useSelector(state => selector(state, 'type'))

  return (
    <form
      className={classNames('with-label', { submitting })}
      onSubmit={handleSubmit}
    >
      <div className='form-group row'>
        <label className='col-md-3 col-form-label'>Action Type</label>
        <div className='col-md-9'>
          <Field
            component={SelectField}
            disabled={!isCreate}
            name='type'
            options={typeOptions}
            validate={required()}
            labelKey='id'
            valueKey='id'
          />
        </div>
      </div>

      {type === PromptTypes.TRANSFER && (
        <div className='form-group row'>
          <label className='col-md-3 col-form-label'>Transfer Number</label>
          <div className='col-md-9'>
            <Field
              name='TransferOptionId'
              component={SelectField}
              options={transferOptions}
              labelKey='name'
              valueKey='id'
              validate={required()}
            />
          </div>
        </div>
      )}

      {type === PromptTypes.END_CALL && (
        <div className='form-group row'>
          <label className='col-md-3 col-form-label'>Message</label>
          <div className='col-md-9'>
            <Field
              type='textarea'
              component={InputField}
              name='messages[0].content'
              label='Message'
              validate={required()}
            />
          </div>
        </div>
      )}

      <div className='button-row'>
        {isCreate ? (
          <MDBBtn type='submit' color='primary' disabled={submitting}>
            Add Action
          </MDBBtn>
        ) : (
          <MDBBtn type='submit' color='success' disabled={submitting}>
            Update Action
          </MDBBtn>
        )}

        {children}
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'IVRActionForm',
})(IVRActionForm)
