import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GroupList({ items }) {
  return (
    <ul className="w-full pr-2 text-gray-900 dark:text-white">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            to={`/cabinet/${item.id}`}
            className="relative mb-1 inline-flex items-center rounded w-full px-5 py-3 text-sm font-medium
           hover:bg-gray-200 hover:text-blue-700 focus:bg-gray-200 focus:ring-blue-700 focus:text-blue-700
            dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500
             dark:focus:text-white dark:focus:bg-gray-600"
          >
            <span className="mr-8">
              <FontAwesomeIcon className="absolute top-3.5" icon={item.icon} />
            </span>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

GroupList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default GroupList;
