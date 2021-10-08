import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import './Sidebar.scss';

// const isActive = (path, location) => (path === location ? 'active' : '');

const Sidebar = ({ isOpen, toggle }) => null;

Sidebar.defaultProps = {
  isOpen: false,
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

export default withRouter(Sidebar);
