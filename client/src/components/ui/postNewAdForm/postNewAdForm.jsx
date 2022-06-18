import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Card, TextField, TextAreaField } from '../../common';
import CategoriesDropdown from '../categories/categoriesDropdown';
import ConfirmationModalContent from './confirmationModalContent/confirmationModalContent';
import { useAds, useConstants, useModal } from '../../../hooks';
import { storageService } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { CategoryField, AdImagesField, PostSubmitBtn, PostBtnGroup } from './';
import { toast } from 'react-toastify';

function PostNewAdForm() {
  const { register, control, handleSubmit, resetField, getValues, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'adImages',
  });
  const [selectedMainCategory, setSelectedMainCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const [isSelling, setIsSelling] = useState(true);
  const { mainCategories, fetchMainCategories, subCategories, fetchSubCategories } = useConstants();
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

  const onSubmit = async (data) => {
    if (!Object.keys(selectedSubCategory).length) {
      return toast.error('Choose category');
    }

    if (!Object.keys(data.adImages[0]).length) {
      return toast.error('Upload a photo');
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

  const handleIsSelling = (bool) => {
    bool ? resetField('price') : resetField('desired-product');
    setIsSelling(bool);
  };

  const handleConfirmationModal = async (data) => {
    hideModal();
    navigate('/result', { replace: true });
    createAd({
      ...data,
      category: selectedSubCategory.id,
    });
  };

  const confirmationModal = (data) =>
    showModal({
      closable: true,
      content: <ConfirmationModalContent />,
      footerButtons: [
        {
          text: 'Confirm',
          handler: () => handleConfirmationModal(data),
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
          <TextField id="name" register={register} label="Name" placeholder="Ad name..." options={{ required: true }} />
          <CategoryField
            selectedSubCategory={selectedSubCategory}
            selectedMainCategory={selectedMainCategory}
            imageUrl={imageUrl}
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
          <PostBtnGroup isSelling={isSelling} handleIsSelling={handleIsSelling} />
          {isSelling ? (
            <div className="w-1/3">
              <TextField
                id="price"
                register={register}
                placeholder="Price..."
                options={{
                  required: true,
                  pattern: {
                    value: /^(\d){1,13}$/g,
                    message: 'The price is entered incorrectly',
                  },
                }}
              />
            </div>
          ) : (
            <TextAreaField
              register={register}
              id="desired-product"
              placeholder="Leave a description of the product you want..."
              options={{ required: true }}
            />
          )}
        </Card>
        <div className="w-full flex justify-end">
          <PostSubmitBtn />
        </div>
      </form>
    </>
  );
}

export default PostNewAdForm;
