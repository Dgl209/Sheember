import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Category({ id, name, image, mainCategory }) {
  return (
    <div className="w-[250px] h-[280px] border mb-3 dark:bg-gray-600">
      <div className="w-full h-[200px] flex items-center justify-center mb-2">
        <Link to={`/${mainCategory}/${id}`}>
          <img width={200} src={image} alt="" />
        </Link>
      </div>
      <div className="flex justify-center">
        <Link to={`/${mainCategory}/${id}`} className="text-lg text-[#333] hover:text-sky-500 hover:underline mb-2">
          {name}
        </Link>
      </div>
    </div>
  );
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  id: PropTypes.string,
  mainCategory: PropTypes.string,
};

export default Category;
