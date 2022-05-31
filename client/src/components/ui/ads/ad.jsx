import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoodsBackdrop from '../../../assets/tmp/truck.webp';

function Ad({ goods }) {
  return (
    <div className="w-[240px] h-[316px] relative border border-gray-200 rounded-lg mb-4 p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="absolute bottom-4 right-2">
        <button type="button" onClick={() => console.log('added to wish list')}>
          <svg className="w-6 h-6" fill="none" stroke="#9333ea" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-between flex-col h-full">
        <div className="flex justify-center items-center h-[200px]">
          <Link to={`/${goods.id}`}>
            <img className="max-h-[200px]" src={GoodsBackdrop} alt="" />
          </Link>
        </div>
        <div>
          <Link to={`/${goods.id}`} className="text-[15px] dark:text-white">
            {goods.name}
          </Link>
          <div className="text-[24px] dark:text-white">
            <span>{goods.price}</span>
            <span className="ml-1">{goods.currency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Ad.propTypes = {
  goods: PropTypes.object.isRequired,
};

export default Ad;
