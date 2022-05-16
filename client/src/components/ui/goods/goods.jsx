import React from 'react';
import PropTypes from 'prop-types';

function Goods({ goods }) {
  return (
    <div className="w-[220px] h-[316px] border mb-4">
      <span>{goods.id + 1}</span>
    </div>
  );
}

Goods.propTypes = {
  goods: PropTypes.object.isRequired,
};

export default Goods;
