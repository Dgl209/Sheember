import React, { useEffect } from 'react';
import { GroupList, SearchField, List } from '../../components/common';
import { useForm } from 'react-hook-form';
import { Ad } from '../../components/ui';
import { AdsLoader } from '../../hoc';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesList, getCategoriesLoadingStatus } from '../../store/categories/categories.selectors';
import { getAds } from '../../store/ads/ads.selectors';
import { loadCategories } from '../../store/categories/categories.actions';
import { loadRecentlyAds } from '../../store/ads/ads.actions';
import { customHistory } from '../../utils/helpers';

function Main() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesList());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const ads = useSelector(getAds());
  const AdsList = List(Ad);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadRecentlyAds());
  }, []);

  const onSubmit = (data) => console.log('search: ', data);

  const handleMainCategoriesList = ({ id }) => {
    customHistory.push(`/catalog/${id}`);
  };

  return (
    <div className="relative container mx-auto flex">
      <div className="w-[26%]">
        <div className="border-r border-gray-200 dark:border-gray-600 pt-6">
          {!categoriesLoading && <GroupList items={categories} onClick={handleMainCategoriesList} />}
        </div>
      </div>
      <div className="w-full pt-6">
        <div className="w-full max-w-2xl mx-auto mb-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SearchField
              register={register}
              type="search"
              id="search"
              placeholder="I search..."
              options={{ required: true }}
            />
          </form>
        </div>
        <div className="px-2">
          <h5 className="mb-4 ml-8 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Latest ads</h5>
          <AdsLoader>
            <AdsList items={ads} columns="4" />
          </AdsLoader>
        </div>
      </div>
    </div>
  );
}

export default Main;
