import accountSlice from './account.slice';
import { userService } from '../../services';
import { handleError } from '../errors/errors.actions';
import { createAction } from '@reduxjs/toolkit';

const { requested, received, failed, created, accountRemoved, creationRequested, creationFailed } =
  accountSlice.actions;
const updateFailed = createAction('account/updateFailed');

const createAccount = (payload) => async (dispatch) => {
  dispatch(creationRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(created(content));
  } catch (error) {
    dispatch(creationFailed());
    dispatch(handleError(error));
  }
};

const loadAccountById = (id) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await userService.getUserById(id);
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const removeAccountData = () => (dispatch) => {
  dispatch(accountRemoved());
};

const updateAccount = (payload) => async (dispatch) => {
  try {
    const { content } = await userService.update(payload);
    return content;
  } catch (error) {
    dispatch(updateFailed());
    dispatch(handleError(error));
  }
};

export { createAccount, loadAccountById, removeAccountData };
