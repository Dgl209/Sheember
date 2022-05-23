import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { categoriesConstants } from '../../utils/constants';
import { SubCategory } from '../../components/common';
import { GoodsContext } from '../../context';
import { Goods } from '../../components/ui';

function Catalog() {
  const { goods } = useContext(GoodsContext);
  console.log(goods);
  const { mainCategory, subCategory } = useParams();
  const selectedMainCategory = categoriesConstants.find((constant) => constant.id === mainCategory);

  const filteredGoodsBySubCategories = goods.filter((gds) => gds.category === subCategory);

  console.log('filtered', filteredGoodsBySubCategories);

  return (
    <div className="p-6">
      {!subCategory ? (
        <div className="w-full grid grid-cols-5 place-items-center">
          {selectedMainCategory.child.map((child) => (
            <SubCategory key={child.id} {...child} mainCategory={mainCategory} />
          ))}
        </div>
      ) : (
        <div className="flex flex-cols-4">
          {filteredGoodsBySubCategories.map((gds) => (
            <Goods key={gds.id} goods={gds} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalog;
