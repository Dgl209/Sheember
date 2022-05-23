import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SubCategory({ id, name, image, mainCategory }) {
  return (
    <div className="w-[240px] h-[280px] border border-gray-200 mb-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full h-[200px] flex items-center justify-center">
        <Link to={`/${mainCategory}/${id}`}>
          <img width={200} src={image} alt="" />
        </Link>
      </div>
      <div className="flex justify-center items-center h-[80px]">
        <Link
          to={`/${mainCategory}/${id}`}
          className="text-lg font-medium mb-2 text-gray-900 hover:text-sky-500 hover:underline dark:text-white"
        >
          {name}
        </Link>
      </div>
    </div>
  );
}

SubCategory.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  id: PropTypes.string,
  mainCategory: PropTypes.string,
};

export default SubCategory;
