import React from 'react';
import PropTypes from 'prop-types';

function Goods({ goods }) {
  return (
    <div className="w-[187px] h-[316px] border">
      <span>{goods.id}</span>
    </div>
  );
}

Goods.propTypes = {
  goods: PropTypes.object.isRequired,
};

export default Goods;
