import React, { useContext } from 'react';
import { CategoriesList, SearchField } from '../../components/common';
import { categories } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import { GoodsList } from '../../components/ui';
import { GoodsContext } from '../../context';

function Main() {
  const { register, handleSubmit } = useForm();
  const { goods } = useContext(GoodsContext);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="relative container mx-auto flex">
      <div className="w-[24%] pt-6 border-r-2">
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
          <GoodsList goods={goods} />
        </div>
      </div>
    </div>
  );
}

export default Main;
