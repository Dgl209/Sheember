import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cabinetItemsService } from '../../services';
import { FETCH, SHOW_LOADER, SET_ERROR } from '../types';
import { CabinetItemContext } from './cabinetItemsContext';
import { CabinetItemsReducer } from './cabinetItemsReducer';
import { toast } from 'react-toastify';

export const CabinetItemsState = ({ children }) => {
  const initialState = {
    cabinetItems: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(CabinetItemsReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchCabinetItems = async () => {
    showLoader();
    try {
      const { content } = await cabinetItemsService.fetchAll();
      console.log('content: ', content);
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
    <CabinetItemContext.Provider
      value={{
        fetchCabinetItems,
        showLoader,
        cabinetItems: state.cabinetItems,
        loading: state.loading,
      }}
    >
      {children}
    </CabinetItemContext.Provider>
  );
};

CabinetItemsState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
