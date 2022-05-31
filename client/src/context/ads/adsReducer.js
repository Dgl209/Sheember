import { POST_AD } from '../types';

const handlers = {
  [POST_AD]: (state, { payload }) => [...state, payload],
  DEFAULT: (state) => state,
};

export const AdsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
