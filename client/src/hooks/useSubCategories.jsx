import { useContext } from 'react';
import { SubCategoriesContext } from '../context';

const useSubCategories = () => {
  return useContext(SubCategoriesContext);
};

export default useSubCategories;
