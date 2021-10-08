import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required } from 'redux-form-validators'

import states from 'utils/states'
import InputField from 'components/forms/InputField'
import SelectField from 'components/forms/SelectField'
import TagField from 'components/forms/TagField'
import PhoneField from 'components/forms/PhoneField'
import RangeField from 'components/forms/RangeField'

type Props = {
  isNumbersLoading: boolean
  integrations: Integration[]
  IntegrationId: string | number
  numbers: string[]
  handleSubmit(onSubmit: any): any
}

class AgentForm extends React.Component<Props & Dispatch> {
  render() {
    const {
      isNumbersLoading,
      integrations,
      IntegrationId,
      numbers,
      children,
      handleSubmit,
    } = this.props
    const selectedIntegration = integrations.find(
      // eslint-disable-next-line
      item => item.id == IntegrationId,
    )

    return (
      <form
        className="with-label"
        onSubmit={handleSubmit}
        autoComplete="off"
        autoCorrect="off"
      >
        <div className="form-group row">
          <label className="col-md-2 col-form-label">Name</label>
          <div className="col-md-10">
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
          <label className="col-md-2 col-form-label">Dialing System</label>
          <div className="col-md-10">
            <Field
              component={SelectField}
              name="IntegrationId"
              options={integrations}
              validate={required()}
              labelKey="partner"
              valueKey="id"
            />
          </div>
        </div>

        <React.Fragment>
          <div className="form-group row">
            <label className="col-md-2 col-form-label">States</label>
            <div className="col-md-10">
              <Field
                component={TagField}
                name="states"
                label="States"
                options={states}
                labelKey="name"
                valueKey="abbreviation"
                multiple
              />
            </div>
          </div>

          {!selectedIntegration || selectedIntegration.partner === 'Dialpad' ? (
            <div className="form-group row">
              <label className="col-md-2 col-form-label">Phone</label>
              <div className="col-md-10">
                {isNumbersLoading ? (
                  'Loading...'
                ) : (
                  <Field
                    component={SelectField}
                    name="phone"
                    options={numbers}
                    validate={required()}
                    labelKey="number"
                    valueKey="number"
                  />
                )}
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div className="form-group row">
                <label className="col-md-2 col-form-label">Phone</label>
                <div className="col-md-10">
                  <Field
                    component={PhoneField}
                    name="phone"
                    validate={required()}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-2 col-form-label">Agent ID</label>
                <div className="col-md-10">
                  <Field
                    type="text"
                    component={InputField}
                    name="agentId"
                    label="Agent ID"
                    validate={required()}
                  />
                </div>
              </div>
            </React.Fragment>
          )}

          <div className="form-group row">
            <label className="col-md-2 col-form-label">Age</label>
            <div className="col-md-10">
              <Field
                component={RangeField}
                name="age"
                validate={required()}
                min={18}
              />
            </div>
          </div>
        </React.Fragment>

        {children}
      </form>
    )
  }
}

export default reduxForm({
  form: 'AgentForm',
})(AgentForm)
