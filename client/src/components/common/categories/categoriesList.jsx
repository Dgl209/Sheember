import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function CategoriesList({ categories }) {
  return (
    <ul className="w-full">
      {categories.map((category) => (
        <li
          key={category.id}
          role="button"
          onClick={() => console.log(category.id)}
          className="text-[15px] text-[#333] hover:text-sky-500 hover:underline"
        >
          <div className="flex">
            <div className="w-10 flex justify-center">
              <FontAwesomeIcon className="text-purple-600 text-[18px]" icon={category.icon} />
            </div>
            {category.name}
          </div>
        </li>
      ))}
    </ul>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoriesList;
