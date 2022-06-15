import { GET_ADS, SHOW_LOADER } from '../types';

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [GET_ADS]: (state, { payload }) => ({ ...state, ads: payload, loading: false }),
  DEFAULT: (state) => state,
};

export const AdsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
