import React, { useContext } from 'react';
import { MainCategoriesList, SearchField } from '../../components/common';
import { categoriesConstants } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import { GoodsList } from '../../components/ui';
import { GoodsContext } from '../../context';

function Main() {
  const { register, handleSubmit } = useForm();
  const { goods } = useContext(GoodsContext);

  const onSubmit = (data) => console.log(data);

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
          <GoodsList goods={goods} />
        </div>
      </div>
    </div>
  );
}

export default Main;
