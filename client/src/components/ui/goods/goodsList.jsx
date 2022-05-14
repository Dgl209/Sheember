import React from 'react';
import PropTypes from 'prop-types';
import { Goods } from '../index';

function GoodsList({ goods }) {
  return (
    <div className="w-full h-full grid grid-cols-5 place-items-center">
      {goods.map((tile) => (
        <Goods key={tile.id} goods={tile} />
      ))}
    </div>
  );
}

GoodsList.propTypes = {
  goods: PropTypes.array.isRequired,
};

export default GoodsList;
