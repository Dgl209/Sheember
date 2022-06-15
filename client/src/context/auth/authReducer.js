import { SET_CURRENT_USER } from '../types';

const handlers = {
  [SET_CURRENT_USER]: (state, { payload }) => ({ state, currentUser: payload }),
  DEFAULT: (state) => state,
};

export const AuthReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
