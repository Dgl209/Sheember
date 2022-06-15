import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mainCategoriesService } from '../../services';
import { MainCategoriesContext } from './mainCategoriesContext';
import { MainCategoriesReducer } from './mainCategoriesReducer';
import { toast } from 'react-toastify';
import { FETCH, SET_ERROR, SHOW_LOADER } from '../types';

export const MainCategoriesState = ({ children }) => {
  const initialState = {
    categories: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(MainCategoriesReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchMainCategories = async () => {
    showLoader();
    try {
      const { content } = await mainCategoriesService.fetchAll();
      dispatch({
        type: FETCH,
        payload: content,
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    if (state.error !== 0) {
      toast.error(state.error);
      dispatch({ type: SET_ERROR, payload: null });
    }
  }, []);

  const errorCatcher = (error) => {
    const { message } = error;
    dispatch({ type: SET_ERROR, payload: message });
  };

  return (
    <MainCategoriesContext.Provider
      value={{
        fetchMainCategories,
        showLoader,
        mainCategories: state.categories,
        mainCategoriesLoading: state.loading,
      }}
    >
      {children}
    </MainCategoriesContext.Provider>
  );
};

MainCategoriesState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
