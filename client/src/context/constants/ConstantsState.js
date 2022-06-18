import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ConstantsContext } from './constantsContext';
import { ConstantsReducer } from './constantsReducer';
import { SET_MAIN_CATEGORIES, SHOW_LOADER, SET_ERROR, SET_SUB_CATEGORIES, SET_CABINET_ITEMS } from '../types';
import constantsService from '../../services/constants.service';
import { toast } from 'react-toastify';

export const ConstantsState = ({ children }) => {
  const initialState = {
    mainCategories: [],
    subCategories: [],
    cabinetItems: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(ConstantsReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchMainCategories = async () => {
    showLoader();
    try {
      const { content } = await constantsService.fetchAll('mainCategories');
      dispatch({
        type: SET_MAIN_CATEGORIES,
        payload: content,
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  const fetchSubCategories = async () => {
    showLoader();
    try {
      const { content } = await constantsService.fetchAll('subCategories');
      dispatch({
        type: SET_SUB_CATEGORIES,
        payload: content,
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  const fetchCabinetItems = async () => {
    showLoader();
    try {
      const { content } = await constantsService.fetchAll('cabinetItems');
      dispatch({
        type: SET_CABINET_ITEMS,
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
    <ConstantsContext.Provider
      value={{
        fetchMainCategories,
        fetchSubCategories,
        fetchCabinetItems,
        constantsLoading: state.loading,
        mainCategories: state.mainCategories,
        subCategories: state.subCategories,
        cabinetItems: state.cabinetItems,
      }}
    >
      {children}
    </ConstantsContext.Provider>
  );
};

ConstantsState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
