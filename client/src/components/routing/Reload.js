import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Reload = ({ isAuthenticated }) => {
  return isAuthenticated ? <Redirect to='/home' /> : <Redirect to='/login' />;
};

const mapStatetoProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Reload.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStatetoProps, {})(Reload);
