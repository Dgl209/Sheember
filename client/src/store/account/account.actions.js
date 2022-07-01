import accountSlice from './account.slice';
import { userService } from '../../services';
import { handleError } from '../errors/errors.actions';

const { requested, received, failed, created, accountRemoved, creationRequested, creationFailed } =
  accountSlice.actions;

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

export { createAccount, loadAccountById, removeAccountData };
