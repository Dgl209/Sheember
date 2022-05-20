import React from 'react';
import PropTypes from 'prop-types';
import { Goods } from '../index';

function GoodsList({ goods }) {
  return (
    <div className="w-full h-full grid grid-cols-4 place-items-center">
      {goods?.map((gds) => (
        <Goods key={gds.id} goods={gds} />
      ))}
    </div>
  );
}

GoodsList.propTypes = {
  goods: PropTypes.array.isRequired,
};

export default GoodsList;
