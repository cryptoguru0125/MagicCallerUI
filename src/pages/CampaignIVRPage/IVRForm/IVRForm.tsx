import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required, numericality } from 'redux-form-validators'
import { MDBBtn } from 'mdbreact'

import InputField from 'components/forms/InputField'
import SelectField from 'components/forms/SelectField'
import SliderField from 'components/forms/SliderField'
import './IVRForm.scss'

interface Props {
  isCreate: boolean
  handleSubmit(onSubmit: any): any
  submitting: boolean
}

const voiceOptions = [
  { text: 'en-US-Standard-B' },
  { text: 'en-US-Standard-C' },
  { text: 'en-US-Standard-D' },
  { text: 'en-US-Standard-E' },
  { text: 'en-US-Wavenet-A' },
  { text: 'en-US-Wavenet-B' },
  { text: 'en-US-Wavenet-C' },
  { text: 'en-US-Wavenet-D' },
  { text: 'en-US-Wavenet-E' },
  { text: 'en-US-Wavenet-F' },
]

const IVRForm: React.FC<Props> = ({
  isCreate,
  children,
  handleSubmit,
  submitting,
}) => (
  <form className="with-label ivr-form" onSubmit={handleSubmit}>
    <div className="form-group row">
      <label className="col-md-3 col-form-label">Name</label>
      <div className="col-md-9">
        <Field
          type="text"
          component={InputField}
          name="name"
          label="Name"
          validate={required()}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-md-3 col-form-label">Transfer Message</label>
      <div className="col-md-9">
        <Field
          type="textarea"
          component={InputField}
          name="transferMessage"
          label="Transfer Message"
          validate={required()}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-md-3 col-form-label">Remove Message</label>
      <div className="col-md-9">
        <Field
          type="textarea"
          component={InputField}
          name="removeMessage"
          label="Remove Message"
          validate={required()}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-md-3 col-form-label">Voice</label>
      <div className="col-md-9">
        <Field
          component={SelectField}
          name="voice"
          options={voiceOptions}
          labelKey="text"
          valueKey="text"
          validate={required()}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-md-3 col-form-label">Speed</label>
      <div className="col-md-9">
        <Field
          component={SliderField}
          name="speed"
          min={0.25}
          max={4}
          step={0.01}
          validate={required()}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-md-3 col-form-label">Pause Time</label>
      <div className="col-md-9">
        <Field
          type="number"
          component={InputField}
          name="pauseTime"
          validate={[required(), numericality({'>=': 0})]}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-md-3 col-form-label">Loop Time</label>
      <div className="col-md-9">
        <Field
          type="number"
          component={InputField}
          name="loopTime"
          validate={[required(), numericality({'>=': 0})]}
        />
      </div>
    </div>

    <div className="form-group row">
      <label className="col-md-3 col-form-label"># Of Loops</label>
      <div className="col-md-9">
        <Field
          type="number"
          component={InputField}
          name="loop"
          validate={[required(), numericality({'>=': 1})]}
        />
      </div>
    </div>

    <div className="button-row">
      {isCreate ? (
        <MDBBtn type="submit" color="primary" disabled={submitting}>
          Add IVR
        </MDBBtn>
      ) : (
        <MDBBtn type="submit" color="success" disabled={submitting}>
          Update Setting
        </MDBBtn>
      )}

      {children}
    </div>
  </form>
)

export default reduxForm({
  form: 'IVRForm',
})(IVRForm)
