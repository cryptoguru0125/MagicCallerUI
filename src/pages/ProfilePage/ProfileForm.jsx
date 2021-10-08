import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required, email } from 'redux-form-validators';
import {
  MDBBtn,
} from 'mdbreact';

import InputField from 'components/forms/InputField';
import { asyncEmailValidate } from 'components/forms/validators';

const ProfileForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      type="text"
      component={InputField}
      name="firstName"
      label="First Name"
      validate={required()}
    />
    <Field
      type="text"
      component={InputField}
      name="lastName"
      label="Last Name"
      validate={required()}
    />
    <Field
      type="email"
      component={InputField}
      name="email"
      label="Email"
      validate={[required(), email()]}
    />
    <Field
      type="password"
      component={InputField}
      name="password"
      label="Password"
    />
    <div className="form-group d-flex">
      <MDBBtn type="submit" color="primary">
        Update Profile
      </MDBBtn>
    </div>
  </form>
);

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ProfileForm',
  asyncValidate: asyncEmailValidate(),
  asyncChangeFields: ['email'],
})(ProfileForm);
