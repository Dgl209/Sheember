import React from 'react';
import { CategoriesList, SearchField } from '../../components/common';
import { categories } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import { GoodsList } from '../../components/ui';

function Main() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="relative container mx-auto flex">
      <div className="w-[31%] pt-6">
        <div className="fixed">
          <CategoriesList categories={categories} />
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
        <div>
          <GoodsList
            goods={new Array(20).fill(null).map((_, index) => {
              return {
                id: index,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
