import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SelectField, TextField } from '../../components/common';
import { CategoriesDropdown } from '../../components/ui';
import { categoriesConstants, currenciesConstants } from '../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faQuestion, faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import TextAreaField from '../../components/common/form/textAreaField';
import { useNavigate } from 'react-router-dom';
import { useAds, useModal } from '../../hooks';

function PostNewAd() {
  const { register, handleSubmit } = useForm();
  const [selectedMainCategory, setSelectedMainCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const { ads, add } = useAds();
  const { show, hide } = useModal();
  const navigate = useNavigate();
  const categoriesRef = useRef();

  const onSubmit = (data) => {
    if (!Object.keys(selectedSubCategory).length) {
      console.log(categoriesRef.current);
      return;
    }

    show({
      closable: true,
      content: (
        <div className="px-2 py-10 text-center">
          <FontAwesomeIcon className="w-12 h-12 mb-6 text-gray-400 dark:text-gray-50" icon={faQuestion} />
          <h3 className="text-lg font-normal text-gray-900 dark:text-gray-50">
            You are sure you want to publish this ad?
          </h3>
        </div>
      ),
      footerButtons: [
        {
          text: 'Confirm',
          handler: () => {
            add({ ...data, id: Date.now(), category: selectedSubCategory.id });
            hide();
            navigate('/', { replace: true });
          },
        },
        {
          text: 'Cancel',
          handler: hide,
        },
      ],
    });
  };

  useEffect(() => {
    localStorage.setItem('goods', JSON.stringify(ads));
  }, [ads]);

  const handleMainCategory = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
  };

  const handleSubCategory = (subCategory) => {
    hide();
    setSelectedSubCategory(subCategory);
  };

  return (
    <div className="container mx-auto mb-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="my-6 text-4xl font-medium dark:text-white">Post new ad</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-gray-200 px-6 py-6 mb-6 rounded dark:bg-gray-800">
          <div className="w-full max-w-2xl">
            <TextField id="name" register={register} placeholder="Ad name..." options={{ required: true }} />

            <div
              ref={categoriesRef}
              className="cursor-pointer mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-2.5 ml-0.3 dark:bg-gray-700 dark:border-gray-600
                dark:placeholder-gray-400 dark:text-gray-50 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onClick={() =>
                show({
                  title: 'Choose category',
                  closable: true,
                  content: (
                    <CategoriesDropdown
                      categories={categoriesConstants}
                      onMainCategory={handleMainCategory}
                      onSubCategory={handleSubCategory}
                    />
                  ),
                  width: '700px',
                })
              }
            >
              <div className="flex justify-between">
                {Object.keys(selectedSubCategory).length ? (
                  <div className="flex">
                    <img width={70} src={selectedSubCategory.image} alt="" />
                    <div className="flex justify-center flex-col ml-2">
                      <h3>{selectedSubCategory.name}</h3>
                      <p className="font-normal text-gray-700 dark:text-gray-400">{selectedMainCategory.name}</p>
                    </div>
                  </div>
                ) : (
                  <p className="font-normal text-gray-700 dark:text-gray-400">Choose category...</p>
                )}
                <div className="flex items-center justify-center px-4">
                  <FontAwesomeIcon
                    className="h-5 text-gray-700 dark:text-gray-400"
                    icon={Object.keys(selectedSubCategory).length ? faAngleRight : faAngleDown}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 px-6 py-10 mb-6 rounded dark:bg-gray-800">
          <div className="w-full max-w-2xl">
            <h2 className="dark:text-white">Photo</h2>
            <div className="grid grid-cols-4">
              {new Array(16).fill(null).map((box, index) => (
                <div
                  key={index}
                  className="w-40 h-32 m-2 flex items-center justify-center bg-gray-400 dark:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faImage} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-200 px-6 py-10 mb-6 rounded dark:bg-gray-800">
          <div className="w-full max-w-2xl">
            <TextAreaField
              register={register}
              id="description"
              placeholder="Leave a description..."
              options={{ required: true }}
            />
          </div>
        </div>
        <div className="bg-gray-200 px-6 py-10 mb-6 rounded dark:bg-gray-800">
          <div className="w-full max-w-2xl flex items-center">
            <div className="w-52 mr-2">
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
            </div>
            <div className="w-28 mb-0.5">
              <SelectField
                register={register}
                items={currenciesConstants}
                id="currency"
                options={{
                  required: true,
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4
             focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-3 mb-2 dark:bg-purple-600
              dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostNewAd;
