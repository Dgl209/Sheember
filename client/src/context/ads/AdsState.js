import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { AdsReducer } from './adsReducer';
import { AdsContext } from './adsContext';
import { POST_AD } from '../types';

export const AdsState = ({ children }) => {
  const ads = JSON.parse(localStorage.getItem('goods'));
  const [state, dispatch] = useReducer(AdsReducer, ads || []);

  const add = (ad) => {
    const { id, name, category, description, price, currency } = ad;
    dispatch({
      type: POST_AD,
      payload: { id, name, category, description, price, currency },
    });
  };

  return (
    <AdsContext.Provider
      value={{
        add,
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
