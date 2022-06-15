import React from 'react';
import PropTypes from 'prop-types';

function PostBtnGroup({ isSelling, handleIsSelling }) {
  return (
    <ul className="flex flex-wrap mb-4 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li
        role="button"
        onClick={() => handleIsSelling(true)}
        className={
          'mr-2 inline-block py-3 px-4 rounded-lg' +
          (isSelling
            ? ' text-white bg-blue-600'
            : ' hover:text-gray-900 hover:bg-gray-100' + ' dark:hover:bg-gray-700 dark:hover:text-white')
        }
      >
        Sell
      </li>
      <li
        role="button"
        onClick={() => handleIsSelling(false)}
        className={
          'mr-2 inline-block py-3 px-4 rounded-lg' +
          (!isSelling
            ? ' text-white bg-blue-600'
            : ' hover:text-gray-900 hover:bg-gray-100' + ' dark:hover:bg-gray-700 dark:hover:text-white')
        }
      >
        Exchange
      </li>
    </ul>
  );
}

PostBtnGroup.propTypes = {
  isSelling: PropTypes.bool.isRequired,
  handleIsSelling: PropTypes.func.isRequired,
};

export default PostBtnGroup;
