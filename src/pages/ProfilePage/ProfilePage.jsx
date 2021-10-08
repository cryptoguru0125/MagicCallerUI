import React from 'react';
import PropTypes from 'prop-types';
import { initialize as intializeForm } from 'redux-form';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
} from 'mdbreact';

import * as actions from 'store/profile/actions';
import ProfileForm from './ProfileForm';
import './ProfilePage.scss';

class ProfilePage extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    this.props.dispatch(intializeForm('ProfileForm', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));
  }

  updateProfile = values => {
    this.props.dispatch(actions.updateProfile(values));
  }

  render() {
    return (
      <MDBContainer>
        <div className="mw-500px mx-auto">
          <MDBCard>
            <MDBCardBody>
              <ProfileForm
                onSubmit={this.updateProfile}
              />
            </MDBCardBody>
          </MDBCard>
        </div>
      </MDBContainer>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
};

export default ProfilePage;
