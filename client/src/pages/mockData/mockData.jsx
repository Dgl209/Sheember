import React, { useEffect, useState } from 'react';
import { useMockData } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesList, getCategoriesLoadingStatus } from '../../store/categories/categories.selectors';
import { GroupList, ImageField } from '../../components/common';
import { loadCategories } from '../../store/categories/categories.actions';
import { getSubcategoriesList } from '../../store/subcategories/subcategories.selectors';
import { loadSubcategories } from '../../store/subcategories/subcategories.actions';
import { useForm } from 'react-hook-form';

function MockData() {
  const { register, handleSubmit, getValues, watch, resetField } = useForm();
  const { error, initialize, uploadSubcategoriesImages, progress, status } = useMockData();
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesList());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const subcategories = useSelector(getSubcategoriesList());
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  useEffect(() => {}, [watch()]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(loadSubcategories(selectedCategory.id));
    }
  }, [selectedCategory]);

  const handleClick = () => {
    initialize();
  };

  const handleCategories = (id) => {
    setSelectedCategory(id);
  };

  const onSubmit = (data) => {
    const newData = {};
    Object.keys(data).forEach((item) => {
      if (data[item].length) {
        newData[item] = data[item];
      }
    });
    uploadSubcategoriesImages(newData, subcategories);
  };

  const handleRemove = (id) => {
    resetField(id);
  };

  return (
    <div className="container mx-auto flex flex-col items-center h-[80vh]">
      <div className="p-6 mb-6 mt-6 w-full max-h-52 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Initializing data to firebase
        </h5>
        <ul className="mb-6 dark:text-white">
          <li>Status: {status}</li>
          <li>Progress: {progress}%</li>
          {error && <li>Errors</li>}
        </ul>
        <button
          onClick={handleClick}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Initialize
        </button>
      </div>
      <div className="p-6 mb-6 mt-6 w-full min-h-52 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Upload photos for subcategories to firebase
        </h5>
        <div className="flex w-full">
          <div className="w-[26%]">
            {!categoriesLoading && <GroupList items={categories} onClick={handleCategories} />}
          </div>
          <div className="w-full">
            {subcategories.length ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full grid grid-cols-4">
                  {subcategories.map((item) => (
                    <ImageField
                      key={item.id}
                      id={item.id}
                      register={register}
                      uploadedFile={getValues(item.id)}
                      description={item.name}
                      remove={handleRemove}
                      index={item.id}
                    />
                  ))}
                </div>
                <div className="w-full flex justify-center pt-6">
                  <button
                    type="submit"
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  >
                    Upload photos to firebase
                  </button>
                </div>
              </form>
            ) : (
              <div className="w-full flex justify-center items-center pt-6">
                <p className="dark:text-white text-center">Choose category for upload photos to firebase</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockData;
