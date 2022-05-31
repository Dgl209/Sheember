import React from 'react';
import PropTypes from 'prop-types';
import { SubCategory } from '../index';

function SubCategoriesList({ items }) {
  return (
    <div className="w-full h-full grid grid-cols-5 place-items-center">
      {items?.map((item) => (
        <SubCategory key={item.id} {...item} />
      ))}
    </div>
  );
}

SubCategoriesList.propTypes = {
  items: PropTypes.array,
};

export default SubCategoriesList;
