import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AdsReducer } from './adsReducer';
import { AdsContext } from './adsContext';
import { GET_ADS, SET_ERROR, SHOW_LOADER } from '../types';
import adsService from '../../services/ads.services';
import { toast } from 'react-toastify';

export const AdsState = ({ children }) => {
  const initialState = {
    ads: [],
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(AdsReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const createAd = async (data, path) => {
    try {
      adsService.create(data, path);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getAds = async (path) => {
    showLoader();
    try {
      const { content } = await adsService.get(path);
      console.log('ads content: ', content);
      dispatch({
        type: GET_ADS,
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
    <AdsContext.Provider
      value={{
        createAd,
        getAds,
        ads: state.ads,
        adsLoading: state.loading,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

AdsState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
