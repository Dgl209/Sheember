import React, { useReducer, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AdsReducer } from './adsReducer';
import { AdsContext } from './adsContext';
import { POST_AD } from '../types';
import adsService from '../../services/ads.services';
import { toast } from 'react-toastify';

export const AdsState = ({ children }) => {
  const [state, dispatch] = useReducer(AdsReducer);
  const [error, setError] = useState(null);

  const createAd = async (data) => {
    const { id, name, category, description, price, currency } = data;

    try {
      const { content } = adsService.create(data);
      return content;
    } catch (error) {
      errorCatcher(error);
    }

    dispatch({
      type: POST_AD,
      payload: { id, name, category, description, price, currency },
    });
  };

  useEffect(() => {
    if (error !== 0) {
      toast.error(error);
      setError(null);
    }
  }, []);

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
  };

  return (
    <AdsContext.Provider
      value={{
        createAd,
        ads: state,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

AdsState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
