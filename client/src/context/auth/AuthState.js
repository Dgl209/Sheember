import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './authContext';
import { AuthReducer } from './authReducer';
import { SET_CURRENT_USER, SET_ERROR } from '../types';
import axios from 'axios';
import { userService, setTokens, localStorageService } from '../../services';
import { toast } from 'react-toastify';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const errorHandler = {
  INVALID_EMAIL: 'Invalid email',
  INVALID_PASSWORD: 'Invalid password',
  EMAIL_NOT_FOUND: 'Email not found',
  EMAIL_EXISTS: 'Email is already registered',
};

export const AuthState = ({ children }) => {
  const initialState = {
    currentUser: undefined,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', { email, password, returnSecureToken: true });
      console.log('sing in: ', data);
      setTokens(data);
      getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log('code: ', code, 'message: ', message);
      if (code === 400) {
        const err = errorHandler[message];
        throw err;
      }
    }
  };

  const signUp = async ({ email, password, ...rest }) => {
    try {
      const { data } = await httpAuth.post('accounts:signUp', { email, password, returnSecureToken: true });
      console.log('sing up: ', data);
      setTokens(data);
      await createUser({ id: data.localId, email, ...rest });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        const err = errorHandler[message];
        throw err;
      }
    }
  };

  const createUser = async (data) => {
    try {
      const { content } = await userService.create(data);
      console.log('create user content: ', content);
      dispatch({
        type: SET_CURRENT_USER,
        payload: content,
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getUserData = async () => {
    try {
      const { content } = await userService.getCurrentUser();
      dispatch({
        type: SET_CURRENT_USER,
        payload: content,
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    if (state.error !== null) {
      toast.error(state.error);
      dispatch({ type: SET_ERROR, payload: null });
    }
  }, [state.error]);

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
