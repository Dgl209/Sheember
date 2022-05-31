import React from 'react';
import { SearchField } from '../../components/common';
import { categoriesConstants } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import { AdsList, MainCategoriesList } from '../../components/ui';
import { useAds } from '../../hooks';

function Main() {
  const { register, handleSubmit } = useForm();
  const { ads } = useAds();

  const onSubmit = (data) => console.log('search: ', data);

  return (
    <div className="relative container mx-auto flex">
      <div className="w-[26%] pt-6 border-r border-gray-200 dark:border-gray-600">
        <div className="fixed">
          <MainCategoriesList categories={categoriesConstants} />
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
          <AdsList ads={ads} />
        </div>
      </div>
    </div>
  );
}

export default Main;
