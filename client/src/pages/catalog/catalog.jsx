import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Ad, SubCategory } from '../../components/ui';
import { useAds, useConstants } from '../../hooks';
import { List } from '../../components/common';

function Catalog() {
  const { mainCategory, subCategory } = useParams();
  const { subCategories, constantsLoading, fetchSubCategories } = useConstants();
  const { adsLoading, getAds, ads } = useAds();
  const selectedSubCategories = subCategories.filter((x) => x.parent_id === mainCategory);
  const SubCategoriesList = List(SubCategory);
  const AdsList = List(Ad);

  useEffect(() => {
    if (!subCategory) {
      fetchSubCategories();
    }
  }, []);

  useEffect(() => {
    if (subCategory) {
      getAds('"category"', subCategory);
    }
  }, [subCategory]);

  return (
    <div className="p-6">
      {!subCategory
        ? !constantsLoading && <SubCategoriesList items={selectedSubCategories} columns="5" />
        : !adsLoading && <AdsList items={ads} columns="4" />}
    </div>
  );
}

export default Catalog;
