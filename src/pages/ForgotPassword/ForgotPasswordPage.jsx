import React from 'react';
import PropTypes from 'prop-types';
import { replace } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { required, email } from 'redux-form-validators';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBBtn,
  MDBModalFooter,
} from 'mdbreact';
import InputField from 'components/forms/InputField';

import * as actions from 'store/auth/actions';
import './ForgotPasswordPage.scss';

class ForgotPasswordPage extends React.Component {
  state = { success: false };

  constructor(props) {
    super(props);

    if (props.user) {
      this.props.dispatch(replace('/'));
    }
  }

  onSubmit = values => actions
    .forgotPassword(values)
    .then(() => {
      this.setState({
        success: true,
      });
    })
    .catch(res => {
      const message = res.status === 400
        ? 'Sorry, we can not find your email address'
        : 'Sorry. there was a problem on connecting the server';
      throw new SubmissionError({
        _error: message,
      });
    });

  render() {
    const { error, handleSubmit } = this.props;
    const { success } = this.state;

    if (success) {
      return (
        <MDBContainer>
          <MDBCard className="login-box">
            <MDBCardBody className="mx-4">
              <MDBCardText className="text-center">
                The reset password email was sent successfully.
                {' '}
                <br />
                <Link to="/login">Back to login</Link>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      );
    }
    return (
      <MDBContainer>
        <form className="login-box" onSubmit={handleSubmit(this.onSubmit)}>
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Reset your password</strong>
                </h3>
              </div>

              {error && (
                <div className="red-text text-center my-3">{error}</div>
              )}

              <Field
                component={InputField}
                type="email"
                name="email"
                label="Your email"
                icon="envelope"
                validate={[required(), email()]}
              />

              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Send the reset link
                </MDBBtn>
              </div>
            </MDBCardBody>

            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small grey-text d-flex justify-content-end">
                Have a password?
                <Link to="/login" className="blue-text ml-1">
                  Login
                </Link>
              </p>
            </MDBModalFooter>
          </MDBCard>
        </form>
      </MDBContainer>
    );
  }
}

ForgotPasswordPage.propTypes = {
  user: PropTypes.shape({}),
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ForgotPasswordForm',
})(ForgotPasswordPage);
