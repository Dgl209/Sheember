import { SubCategoriesContext } from './subCategoriesContext';
import PropTypes from 'prop-types';
import React, { useReducer, useEffect } from 'react';
import { SubCategoriesReducer } from './subCategoriesReducer';
import { SHOW_LOADER, FETCH, SET_ERROR } from '../types';
import { subCategoriesService } from '../../services';
import { toast } from 'react-toastify';

export const SubCategoriesState = ({ children }) => {
  const initialState = {
    categories: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(SubCategoriesReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchSubCategories = async () => {
    showLoader();
    try {
      const { content } = await subCategoriesService.fetchAll();
      dispatch({
        type: FETCH,
        payload: content,
      });
    } catch (error) {
      console.log('I am cathing errors !!!');
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
    <SubCategoriesContext.Provider
      value={{
        fetchSubCategories,
        showLoader,
        subCategories: state.categories,
        loading: state.loading,
      }}
    >
      {children}
    </SubCategoriesContext.Provider>
  );
};

SubCategoriesState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
