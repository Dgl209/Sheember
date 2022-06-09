import { useContext } from 'react';
import { MainCategoriesContext } from '../context';

const useMainCategories = () => {
  return useContext(MainCategoriesContext);
};

export default useMainCategories;
