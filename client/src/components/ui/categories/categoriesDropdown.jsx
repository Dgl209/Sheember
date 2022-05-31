import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function CategoriesDropdown({ categories, onMainCategory, onSubCategory }) {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    onMainCategory(selected);
  }, [selected]);

  return (
    <div className="w-full flex">
      <ul className="w-1/2 text-gray-900 bg-white max-h-[434px] overflow-y-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {categories.map((category) => (
          <li
            key={category.id}
            role="button"
            onMouseOver={() => {
              setSelected(category);
            }}
            className="relative inline-flex items-center w-full
            py-2 text-sm transition-colors duration-200 font-medium hover:bg-gray-100
            hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
            dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500
            dark:focus:text-white"
          >
            <div className="w-full pr-4 flex justify-between">
              <div className="flex items-center">
                <div className="w-10 flex justify-center">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <div>{category.name}</div>
              </div>
              <div>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul className="w-1/2 text-gray-900 max-h-[434px] overflow-y-auto bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {selected.child?.map((subCategory) => (
          <li
            key={subCategory.id}
            role="button"
            onClick={() => onSubCategory(subCategory)}
            className="relative inline-flex cursor-pointer items-center w-full
            py-2 px-4 text-sm transition-colors duration-200 font-medium hover:bg-gray-100
            hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
            dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500
            dark:focus:text-white"
          >
            {subCategory.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

CategoriesDropdown.propTypes = {
  categories: PropTypes.array.isRequired,
  onMainCategory: PropTypes.func.isRequired,
  onSubCategory: PropTypes.func.isRequired,
};

export default CategoriesDropdown;
