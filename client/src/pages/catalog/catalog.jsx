import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Ad, Subcategory } from '../../components/ui';
import { List } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';
import { loadAds } from '../../store/ads/ads.actions';
import { getAds } from '../../store/ads/ads.selectors';
import { getSubcategoriesList, getSubcategoriesLoadingStatus } from '../../store/subcategories/subcategories.selectors';
import { loadSubcategoriesByParentId } from '../../store/subcategories/subcategories.actions';
import { AdsLoader } from '../../hoc';

function Catalog() {
  const { mainCategory, subCategory } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAds());
  const subcategories = useSelector(getSubcategoriesList());
  const subcategoriesLoading = useSelector(getSubcategoriesLoadingStatus());

  const SubCategoriesList = List(Subcategory);
  const AdsList = List(Ad);

  useEffect(() => {
    if (!subCategory) {
      dispatch(loadSubcategoriesByParentId(mainCategory));
    }
  }, []);

  useEffect(() => {
    if (subCategory) {
      dispatch(loadAds('category', subCategory));
    }
  }, [subCategory]);

  return (
    <div className="p-6">
      {!subCategory ? (
        !subcategoriesLoading && <SubCategoriesList items={subcategories} columns="5" />
      ) : (
        <AdsLoader>
          <AdsList items={ads} columns="4" />
        </AdsLoader>
      )}
    </div>
  );
}

export default Catalog;
