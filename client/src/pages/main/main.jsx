import React, { useEffect } from 'react';
import { GroupList, SearchField, List } from '../../components/common';
import { useForm } from 'react-hook-form';
import { Ad } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesList, getCategoriesLoadingStatus } from '../../store/categories/categories.selectors';
import { loadCategories } from '../../store/categories/categories.actions';

function Main() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const AdsList = List(Ad);
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesList());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  const onSubmit = (data) => console.log('search: ', data);

  const handleMainCategoriesList = ({ id }) => {
    navigate(`/catalog/${id}`, { replace: true });
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
          <AdsList items={[]} columns="4" />
        </div>
      </div>
    </div>
  );
}

export default Main;
