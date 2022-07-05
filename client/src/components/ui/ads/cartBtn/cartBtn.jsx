import React from 'react';
import PropTypes from 'prop-types';
import { ShoppingCartIcon } from '@heroicons/react/outline';

function CartBtn({ children, className: classes, iconClassName, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={
        'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 ' +
        'focus:ring-purple-300 font-medium rounded-lg text-sm ' +
        'dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ' +
        (classes || '')
      }
    >
      <ShoppingCartIcon className={iconClassName} />
      {children}
    </button>
  );
}

CartBtn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  handleClick: PropTypes.func,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default CartBtn;
