import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function CategoriesList({ categories }) {
  return (
    <ul className="w-full text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:text-white">
      {categories.map((category) => (
        <li
          key={category.id}
          role="button"
          onClick={() => console.log(category.id)}
          className="w-full pr-4 py-2 font-normal text-[14px] text-blue-700"
        >
          <div className="flex">
            <div className="w-10 flex justify-center">
              <FontAwesomeIcon className="text-gray-400 text-[18px]" icon={category.icon} />
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
