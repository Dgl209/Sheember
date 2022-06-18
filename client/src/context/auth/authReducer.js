import { HIDE_LOADER, REMOVE_USER, SET_CURRENT_USER } from '../types';

const handlers = {
  [SET_CURRENT_USER]: (state, { payload }) => ({ ...state, currentUser: payload }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [REMOVE_USER]: (state) => ({ ...state, currentUser: null }),
  DEFAULT: (state) => state,
};

export const AuthReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
