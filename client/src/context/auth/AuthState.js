import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './authContext';
import { AuthReducer } from './authReducer';
import { SET_CURRENT_USER, SET_ERROR } from '../types';
import axios from 'axios';
import { userService, setTokens } from '../../services';
import { toast } from 'react-toastify';

const httpAuth = axios.create();

export const AuthState = ({ children }) => {
  const initialState = {
    currentUser: {},
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signIn = async ({ email, password }) => {
    const key = 'AIzaSyAgbFgJwA3RSCBL0yGt4GL5NOd1CIFaMY0';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      console.log('sing in: ', data);
      setTokens(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log('code: ', code, 'message: ', message);
      if (code === 400) {
        if (message === 'INVALID_EMAIL') {
          const errorMessage = 'Invalid email';
          throw errorMessage;
        } else if (message === 'EMAIL_NOT_FOUND') {
          const errorMessage = 'Email not found';
          throw errorMessage;
        } else if (message === 'INVALID_PASSWORD') {
          const errorMessage = 'Invalid password';
          throw errorMessage;
        }
      }
    }
  };

  const signUp = async ({ email, password, ...rest }) => {
    const key = 'AIzaSyAgbFgJwA3RSCBL0yGt4GL5NOd1CIFaMY0';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
      console.log('sing up: ', data);
      setTokens(data);
      await createUser({ id: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует',
          };
          throw errorObject;
        }
      }
    }
  };

  const createUser = async (data) => {
    try {
      const { content } = userService.create(data);
      dispatch({
        type: SET_CURRENT_USER,
        payload: content,
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    if (state.error !== 0) {
      toast.error(state.error);
      dispatch({ type: SET_ERROR, payload: null });
    }
  }, []);

  const errorCatcher = (error) => {
    const { message } = error;
    dispatch({ type: SET_ERROR, payload: message });
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        currentUser: state.currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
