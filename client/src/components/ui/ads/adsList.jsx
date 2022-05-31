import React from 'react';
import PropTypes from 'prop-types';
import { Ad } from '../index';

function AdsList({ ads }) {
  return (
    <div className="w-full h-full grid grid-cols-4 place-items-center">
      {ads?.map((ad) => (
        <Ad key={ad.id} goods={ad} />
      ))}
    </div>
  );
}

AdsList.propTypes = {
  ads: PropTypes.array,
};

export default AdsList;
