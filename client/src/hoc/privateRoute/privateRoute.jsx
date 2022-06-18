import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useModal } from '../../hooks';
import { Registration } from '../../components/layout';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const { showModal } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      showModal({ closable: true, title: 'Sign up', content: <Registration from={location} /> });
    }
  }, []);

  return currentUser ? children : navigate('/');
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
