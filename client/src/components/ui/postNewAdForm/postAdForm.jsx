import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Card, TextField, TextAreaField } from '../../common';
import CategoriesDropdown from '../categories/categoriesDropdown';
import { useModal } from '../../../hooks';
import { CategoryField, AdImagesField, PostSubmitBtn } from './';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createAd } from '../../../store/ads/ads.actions';
import { getCategoriesList } from '../../../store/categories/categories.selectors';
import { getSubcategoriesList } from '../../../store/subcategories/subcategories.selectors';
import { loadCategories } from '../../../store/categories/categories.actions';
import { loadSubcategories } from '../../../store/subcategories/subcategories.actions';
import { customHistory } from '../../../utils/helpers';

function PostAdForm() {
  const { register, control, handleSubmit, getValues, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'adImages',
  });
  const [selectedMainCategory, setSelectedMainCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesList());
  const subcategories = useSelector(getSubcategoriesList());
  const { showModal, hideModal } = useModal();

  useEffect(() => {
    if (!categories.length) {
      dispatch(loadCategories());
    }
    if (!subcategories.length) {
      dispatch(loadSubcategories(selectedMainCategory.id));
    }
  }, []);

  const onSubmit = async (data) => {
    if (!Object.keys(selectedSubCategory).length) {
      return toast.error('Choose category');
    }

    if (!Object.keys(data.adImages[0]).length) {
      return toast.error('Upload a photo');
    }

    if (data.adImages.length < 3) {
      return toast.error('At least 3 images must be uploaded');
    }

    customHistory.push('/result', { private: true });
    const newData = {
      ...data,
      category: selectedSubCategory.id,
    };
    dispatch(createAd(newData));
  };

  const handleMainCategory = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
  };

  const handleSubCategory = (subCategory) => {
    hideModal();
    setSelectedSubCategory(subCategory);
  };

  const categoriesModal = () =>
    showModal({
      title: 'Choose category',
      closable: true,
      content: (
        <CategoriesDropdown
          mainCategories={categories}
          subCategories={subcategories}
          onMainCategory={handleMainCategory}
          onSubCategory={handleSubCategory}
        />
      ),
      width: '700px',
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <TextField id="name" register={register} label="Name" placeholder="Ad name..." options={{ required: true }} />
          <CategoryField
            selectedSubCategory={selectedSubCategory}
            selectedMainCategory={selectedMainCategory}
            categoriesModal={categoriesModal}
            label="Category"
          />
        </Card>
        <Card>
          <AdImagesField
            register={register}
            fields={fields}
            append={append}
            remove={remove}
            getValues={getValues}
            watch={watch}
          />
        </Card>
        <Card>
          <TextAreaField
            register={register}
            id="description"
            placeholder="Leave a description..."
            options={{ required: true }}
            label="Description"
          />
        </Card>
        <Card>
          <div className="w-1/3">
            <TextField
              id="price"
              register={register}
              placeholder="Price..."
              label="Price"
              options={{
                required: true,
                pattern: {
                  value: /^(\d){1,13}$/g,
                  message: 'The price is entered incorrectly',
                },
              }}
            />
          </div>
        </Card>
        <div className="w-full flex justify-end">
          <PostSubmitBtn />
        </div>
      </form>
    </>
  );
}

export default PostAdForm;
