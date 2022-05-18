import React from 'react';
import PropTypes from 'prop-types';
import GamingChair from '../../../assets/tmp/gaming-chair.jfif';
import { Link } from 'react-router-dom';

function Goods({ goods }) {
  return (
    <div className="w-[220px] h-[316px] relative border rounded mb-4 p-4">
      <div className="absolute right-2 top-2">
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
      <div className="flex justify-center flex-col">
        <div className="flex justify-center items-center mb-6">
          <Link to={`/${goods.id}`}>
            <img className="h-[180px]" src={GamingChair} alt="" />
          </Link>
        </div>
        <Link to={`/${goods.id}`} className="text-[15px] text-[#333] hover:text-sky-500 hover:underline mb-2">
          {goods.name}
        </Link>
        <div className="text-[24px]">
          <span>{goods.price}</span>
          <span>$</span>
        </div>
      </div>
    </div>
  );
}

Goods.propTypes = {
  goods: PropTypes.object.isRequired,
};

export default Goods;
