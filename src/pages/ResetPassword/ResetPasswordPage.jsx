import React from 'react';
import PropTypes from 'prop-types';
import { replace } from 'connected-react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { required, confirmation, length } from 'redux-form-validators';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardText,
} from 'mdbreact';
import InputField from 'components/forms/InputField';
import qs from 'qs';

import * as actions from 'store/auth/actions';
import Spinner from 'components/Spinner';
import './ResetPasswordPage.scss';

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    const params = qs.parse(props.search.slice(1));
    if (props.user) {
      this.props.dispatch(replace('/'));
    } else if (!params.token) {
      this.props.dispatch(replace('/login'));
    } else {
      this.props.dispatch(actions.checkToken(params.token));
    }
  }

  onSubmit = values => {
    const params = qs.parse(this.props.search.slice(1));
    return this.props
      .dispatch(
        actions.resetPassword({
          reset_token: params.token,
          ...values,
        }),
      )
      .catch(() => {
        throw new SubmissionError({
          _error: 'Sorry. there was a problem on connecting the server',
        });
      });
  };

  render() {
    const { loading, error, handleSubmit } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <MDBContainer>
        <form className="login-box" onSubmit={handleSubmit(this.onSubmit)}>
          <MDBCard>
            <MDBCardBody className="mx-4">
              <MDBCardText className="text-center">
                Please type in your password
              </MDBCardText>

              {error && (
                <div className="red-text text-center my-3">{error}</div>
              )}

              <Field
                component={InputField}
                type="password"
                name="password"
                label="New password"
                validate={[required(), length({ min: 8 })]}
              />

              <Field
                component={InputField}
                type="password"
                name="repeatPassword"
                label="Repeat password"
                validate={confirmation({
                  field: 'password',
                  message: 'Password does not match',
                })}
              />

              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Update Password
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </form>
      </MDBContainer>
    );
  }
}

ResetPasswordPage.propTypes = {
  loading: PropTypes.bool,
  search: PropTypes.string,
  user: PropTypes.shape({}),
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ResetPasswordForm',
})(ResetPasswordPage);
