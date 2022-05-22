import React from 'react';
import { useParams } from 'react-router-dom';
import { categoriesConstants } from '../../utils/constants';
import { SubsidiaryCategory } from '../../components/common';

function Catalog() {
  const { mainCategory, category } = useParams();
  const selectedMainCategory = categoriesConstants.find((constant) => constant.id === mainCategory);
  return (
    <div className="p-6">
      {!category ? (
        <div className="w-full grid grid-cols-5 place-items-center">
          {selectedMainCategory.child.map((child) => (
            <SubsidiaryCategory key={child.id} {...child} mainCategory={mainCategory} />
          ))}
        </div>
      ) : (
        <h1>{category}</h1>
      )}
    </div>
  );
}

export default Catalog;
