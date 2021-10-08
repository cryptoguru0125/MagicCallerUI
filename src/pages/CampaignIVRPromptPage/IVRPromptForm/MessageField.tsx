import React from 'react'
import { Field } from 'redux-form'
import { MDBIcon } from 'mdbreact'
import { required } from 'redux-form-validators'

import InputField from 'components/forms/InputField'
import classes from './MessageField.module.scss'

interface Props {
  member: any
  onDelete(): void
}

const MessageField: React.FC<Props> = ({ member, onDelete }) => {
  return (
    <div className='form-group row'>
      <div className='col-md-3 col-form-label'>
        <div>Message</div>
        <div className={classes.percentField}>
          <Field
            type='number'
            name={`${member}.percent`}
            component={InputField}
            validate={required()}
          />
          <strong>%</strong>
        </div>

        <span role='button' onClick={onDelete}>
          <MDBIcon icon='trash' />
        </span>
      </div>
      <div className='col-md-9'>
        <Field
          type='textarea'
          component={InputField}
          name={`${member}.content`}
          label='Enter message...'
          validate={required()}
        />
      </div>
    </div>
  )
}

export default MessageField
