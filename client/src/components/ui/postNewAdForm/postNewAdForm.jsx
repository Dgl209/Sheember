import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, SelectField, TextField } from '../../common';
import CategoriesDropdown from '../categories/categoriesDropdown';
import { currenciesConstants } from '../../../utils/constants';
import TextAreaField from '../../common/form/textAreaField';
import { useAds, useMainCategories, useModal, useSubCategories } from '../../../hooks';
import { storageService } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { CategoryField, ImageField } from './';
import PostButton from './postButton/postButton';

function PostNewAdForm() {
  const { register, handleSubmit } = useForm();
  const [selectedMainCategory, setSelectedMainCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const { mainCategories, fetchMainCategories } = useMainCategories();
  const { subCategories, fetchSubCategories } = useSubCategories();
  const [imageUrl, setImageUrl] = useState(null);
  const { showModal, hideModal } = useModal();
  const navigate = useNavigate();
  const { createAd } = useAds();

  useEffect(() => {
    if (!mainCategories.length) {
      fetchMainCategories();
    }
    if (!subCategories.length) {
      fetchSubCategories();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(selectedSubCategory).length) {
      storageService.downloadImage(`/subCategories/${selectedSubCategory.image}`).then((url) => setImageUrl(url));
    }
  }, [selectedSubCategory]);

  const onSubmit = (data) => {
    console.log('data: ', data);
    if (!Object.keys(selectedSubCategory).length) {
      return;
    }

    confirmationModal(data);
  };

  const handleMainCategory = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
  };

  const handleSubCategory = (subCategory) => {
    hideModal();
    setSelectedSubCategory(subCategory);
  };

  const confirmationModal = (data) =>
    showModal({
      closable: true,
      content: (
        <div className="p-6 text-center">
          <svg
            className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to publish this ad?
          </h3>
        </div>
      ),
      footerButtons: [
        {
          text: 'Confirm',
          handler: () => {
            createAd({ ...data, id: Date.now(), category: selectedSubCategory.id });
            hideModal();
            navigate('/result', { replace: true });
          },
        },
        {
          text: 'Cancel',
          handler: hideModal,
        },
      ],
    });

  const categoriesModal = () =>
    showModal({
      title: 'Choose category',
      closable: true,
      content: (
        <CategoriesDropdown
          mainCategories={mainCategories}
          subCategories={subCategories}
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
          <TextField id="name" register={register} placeholder="Ad name..." options={{ required: true }} />
          <CategoryField
            selectedSubCategory={selectedSubCategory}
            selectedMainCategory={selectedMainCategory}
            imageUrl={imageUrl}
            categoriesModal={categoriesModal}
          />
        </Card>
        <Card>
          <ImageField register={register} />
        </Card>
        <Card>
          <TextAreaField
            register={register}
            id="description"
            placeholder="Leave a description..."
            options={{ required: true }}
          />
        </Card>
        <Card>
          <TextField
            id="price"
            register={register}
            label="Price"
            options={{
              required: true,
              pattern: {
                value: /^(\d){1,13}$/g,
                message: 'The price is entered incorrectly',
              },
            }}
          />
          <SelectField
            register={register}
            items={currenciesConstants}
            id="currency"
            options={{
              required: true,
            }}
          />
        </Card>
        <div className="w-full flex justify-end">
          <PostButton />
        </div>
      </form>
    </>
  );
}

export default PostNewAdForm;
