import { SET_CABINET_ITEMS, SET_ERROR, SET_MAIN_CATEGORIES, SET_SUB_CATEGORIES, SHOW_LOADER } from '../types';

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [SET_MAIN_CATEGORIES]: (state, { payload }) => ({ ...state, mainCategories: payload, loading: false }),
  [SET_SUB_CATEGORIES]: (state, { payload }) => ({ ...state, subCategories: payload, loading: false }),
  [SET_CABINET_ITEMS]: (state, { payload }) => ({ ...state, cabinetItems: payload, loading: false }),
  [SET_ERROR]: (state, { payload }) => ({ ...state, error: payload }),
  DEFAULT: (state) => state,
};

export const ConstantsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
