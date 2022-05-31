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
          onClick={() => console.log(category.id)}
          className="py-1.5 transition-colors duration-200 relative block hover:text-gray-900 text-gray-500 dark:text-gray-400 dark:hover:text-white "
        >
          <Link to={`/catalog/${category.id}`}>
            <div className="flex">
              <div className="w-10 flex justify-center">
                <FontAwesomeIcon className="text-lg" icon={category.icon} />
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
