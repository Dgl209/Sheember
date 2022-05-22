import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { GoodsReducer } from './goodsReducer';
import { GoodsContext } from './goodsContext';
import { ADD_GOODS } from '../types';

export const GoodsState = ({ children }) => {
  const goods = JSON.parse(localStorage.getItem('goods'));
  const [state, dispatch] = useReducer(GoodsReducer, goods || []);

  const add = (goods) => {
    const { id, name, category, description, price, currency } = goods;
    dispatch({
      type: ADD_GOODS,
      payload: { id, name, category, description, price, currency },
    });
  };

  return (
    <GoodsContext.Provider
      value={{
        add,
        goods: state,
      }}
    >
      {children}
    </GoodsContext.Provider>
  );
};

GoodsState.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
