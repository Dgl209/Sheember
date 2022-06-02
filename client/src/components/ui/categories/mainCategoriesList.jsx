import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MainCategoriesList({ categories }) {
  return (
    <ul className="w-full pb-1 list-unstyled fw-normal small">
      {categories.map((category) => (
        <li
          key={category.id}
          role="button"
          className="py-1 font-normal transition-colors duration-200 relative block text-sky-700 hover:underline hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-300 "
        >
          <Link to={`/catalog/${category.id}`}>
            <div className="flex">
              <div className="w-10 flex justify-center">
                <FontAwesomeIcon className="text-lg text-[#adb8c8] dark:text-[#adb8c8ce]" icon={category.icon} />
              </div>
              <div className="text-sm">{category.name}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

MainCategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default MainCategoriesList;
