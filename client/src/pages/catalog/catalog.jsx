import React from 'react';
import { useParams } from 'react-router-dom';
import { categoriesConstants } from '../../utils/constants';
import { AdsList, SubCategoriesList } from '../../components/ui';
import { useAds } from '../../hooks';

function Catalog() {
  const { ads } = useAds();
  const { mainCategory, subCategory } = useParams();
  const selectedMainCategory = categoriesConstants.find((constant) => constant.id === mainCategory);

  const filteredAdsBySubCategory = ads.filter((ad) => ad.category === subCategory);

  return (
    <div className="p-6">
      {!subCategory ? (
        <SubCategoriesList items={selectedMainCategory.child} />
      ) : (
        <AdsList ads={filteredAdsBySubCategory} />
      )}
    </div>
  );
}

export default Catalog;
