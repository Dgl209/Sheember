import authSlice from './auth.slice';
import authService from '../../services/auth.service';
import { setTokens, removeAuthData } from '../../services';
import { createAccount, loadAccountById, removeAccountData } from '../account/account.actions';
import { createAction } from '@reduxjs/toolkit';
import { handleError } from '../errors/errors.actions';
import { customHistory } from '../../utils/helpers';

const { succeed, loggedOut } = authSlice.actions;
const requested = createAction('auth/requested');
const failed = createAction('auth/failed');

const signUp =
  ({ email, password, handleHideModal, ...rest }) =>
  async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.register({ email, password });
      setTokens(data);
      dispatch(succeed(data.localId));
      dispatch(createAccount({ id: data.localId, email, ...rest }));
      handleHideModal();
    } catch (error) {
      dispatch(failed());
      dispatch(handleError(error));
    }
  };

const singIn =
  ({ email, password, handleHideModal }) =>
  async (dispatch) => {
    dispatch(requested());
    try {
      const data = await authService.login({ email, password });
      setTokens(data);
      dispatch(succeed(data.localId));
      dispatch(loadAccountById(data.localId));
      handleHideModal();
    } catch (error) {
      dispatch(failed());
      dispatch(handleError(error));
    }
  };

const logOut = () => (dispatch) => {
  customHistory.push('/');
  removeAuthData();
  dispatch(loggedOut());
  dispatch(removeAccountData());
};

export { signUp, singIn, logOut };
