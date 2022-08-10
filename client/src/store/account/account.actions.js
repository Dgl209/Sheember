import accountSlice from './account.slice';
import { userService } from '../../services';
import { handleError } from '../errors/errors.actions';
import { createAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const { requested, received, failed, updated, accountRemoved } = accountSlice.actions;

const updateRequested = createAction('account/updateRequested');
const updateFailed = createAction('account/updateFailed');

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

const updateAccount = (payload) => async (dispatch) => {
  dispatch(updateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(updated(content));
  } catch (error) {
    dispatch(updateFailed());
    dispatch(handleError(error));
  }
};

const removeAccountData = () => (dispatch) => {
  dispatch(accountRemoved());
};

const updateWishlist = (payload) => async (dispatch, getState) => {
  dispatch(updateRequested());
  const accountData = getState().account.entity;

  let newData;
  if (accountData.wishlist && accountData.wishlist.includes(payload)) {
    const filteredWishlist = accountData.wishlist.filter((x) => x !== payload);
    newData = {
      ...accountData,
      wishlist: filteredWishlist,
    };
  } else if (accountData.wishlist) {
    newData = {
      ...accountData,
      wishlist: [...accountData.wishlist, payload],
    };
  } else {
    newData = {
      ...accountData,
      wishlist: [payload],
    };
  }
  try {
    const { content } = await userService.update(newData);
    dispatch(updated(content));
    toast.success('Wish list updated');
  } catch (error) {
    dispatch(updateFailed());
    dispatch(handleError(error));
  }
};

const updateCart = (payload) => async (dispatch, getState) => {
  dispatch(updateRequested());
  const accountData = getState().account.entity;

  let newData;
  if (accountData.cart && accountData.cart.includes(payload)) {
    const filteredCart = accountData.cart.filter((x) => x !== payload);
    newData = {
      ...accountData,
      cart: filteredCart,
    };
  } else if (accountData.cart) {
    newData = {
      ...accountData,
      cart: [...accountData.cart, payload],
    };
  } else {
    newData = {
      ...accountData,
      cart: [payload],
    };
  }
  try {
    const { content } = await userService.update(newData);
    dispatch(updated(content));
    toast.success('Cart updated');
  } catch (error) {
    dispatch(updateFailed());
    dispatch(handleError(error));
  }
};

export { loadAccountById, removeAccountData, updateWishlist, updateCart, updateAccount };
