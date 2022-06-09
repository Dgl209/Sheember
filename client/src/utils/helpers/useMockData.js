import { useState, useEffect } from 'react';
import mainCategoriesJSON from '../../mockData/mainCategories.json';
import subCategoriesJSON from '../../mockData/subCategories.json';
import cabinetItemsJSON from '../..//mockData/cabinetItems.json';
import httpService from '../../services/http.service';

const useMockData = () => {
  const statusConsts = {
    idle: 'Not Started',
    pending: 'In Process',
    successed: 'Ready',
    error: 'Error occurred',
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount = mainCategoriesJSON.length + subCategoriesJSON.length;
  console.log(cabinetItemsJSON.length);
  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };
  const updateProgress = () => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const mainCategory of mainCategoriesJSON) {
        await httpService.put('mainCategories/' + mainCategory.id, mainCategory);
        incrementCount();
      }
      for (const subCategory of subCategoriesJSON) {
        await httpService.put('subCategories/' + subCategory.id, subCategory);
        incrementCount();
      }
      for (const cabinetItem of cabinetItemsJSON) {
        await httpService.put('cabinetItems/' + cabinetItem.id, cabinetItem);
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }
  return { error, initialize, progress, status };
};

export default useMockData;
