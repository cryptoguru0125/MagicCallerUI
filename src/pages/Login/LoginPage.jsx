import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { replace } from 'connected-react-router'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { required, email } from 'redux-form-validators'
import {
  MDBContainer, MDBCard, MDBCardBody, MDBBtn,
} from 'mdbreact'
import InputField from 'components/forms/InputField'

import { clearInfo } from 'utils/storage'
import * as actions from 'store/auth/actions'
import './LoginPage.scss'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    if (props.user) {
      this.props.dispatch(replace('/'))
    } else {
      // clear the info
      clearInfo()
    }
  }

  onSubmit = values => this.props.dispatch(actions.login(values)).catch(res => {
    let message
    if (res.status === 401) {
      message = 'Username or Password is incorrect!'
    } else if (res.status === 403) {
      message = 'Your email is not verified'
    } else {
      message = 'Sorry. there is a problem on connecting the server'
    }

    throw new SubmissionError({
      _error: message,
    })
  })

  render() {
    const { error, handleSubmit, submitting } = this.props

    return (
      <MDBContainer>
        <form className="login-box" onSubmit={handleSubmit(this.onSubmit)}>
          <MDBCard>
            <MDBCardBody className="mx-4">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Sign in</strong>
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

              <Field
                component={InputField}
                type="password"
                name="password"
                label="Your password"
                icon="lock"
                validate={[required()]}
              />

              <p className="font-small blue-text d-flex justify-content-end pb-3">
                <Link to="forgot-password" className="blue-text ml-1">
                  Forgot Password?
                </Link>
              </p>
              <div className="text-center mb-3">
                <MDBBtn
                  type="submit"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  disabled={submitting}
                >
                  Sign in
                </MDBBtn>
              </div>
            </MDBCardBody>
            {/*
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p className="font-small grey-text d-flex justify-content-end">
                Not a member?
                <a href="#!" className="blue-text ml-1">
                  Sign Up
                </a>
              </p>
            </MDBModalFooter>
            */}
          </MDBCard>
        </form>
      </MDBContainer>
    )
  }
}

LoginPage.propTypes = {
  submitting: PropTypes.bool,
  user: PropTypes.shape({}),
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'LoginForm',
})(LoginPage)
