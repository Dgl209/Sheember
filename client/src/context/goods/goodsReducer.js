import { ADD_GOODS } from '../types';

const handlers = {
  [ADD_GOODS]: (state, { payload }) => [...state, payload],
  DEFAULT: (state) => state,
};

export const GoodsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
