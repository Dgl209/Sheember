import { combineReducers } from 'redux';
import adsReducer from './ads/ads.reducer';
import errorsReducer from './errors/errors.reducer';
import categoriesReducer from './categories/categories.reducer';
import subcategoriesReducer from './subcategories/subcategories.reducer';
import authReducer from './auth/auth.reducer';
import accountReducer from './account/account.reducer';

const rootReducer = combineReducers({
  ads: adsReducer,
  categories: categoriesReducer,
  subcategories: subcategoriesReducer,
  errors: errorsReducer,
  auth: authReducer,
  account: accountReducer,
});

export default rootReducer;
