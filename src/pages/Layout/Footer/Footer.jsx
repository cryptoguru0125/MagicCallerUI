import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';

class Footer extends React.Component {
  render() {
    return (
      <MDBFooter color="primary-color" className="font-small mt-4">
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' MagicCall. All rights reserved'}
          </MDBContainer>
        </div>
      </MDBFooter>
    );
  }
}

Footer.propTypes = {};

export default Footer;
