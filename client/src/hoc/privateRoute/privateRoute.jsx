import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModal } from '../../hooks';
import { Registration } from '../../components/layout';
import { useSelector } from 'react-redux';
import { getLoggedInStatus } from '../../store/auth/auth.selectors';

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(getLoggedInStatus());
  const { showModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      showModal({ closable: true, title: 'Sign up', content: <Registration from={location} /> });
    }
  }, []);

  return isLoggedIn ? children : navigate('/');
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
