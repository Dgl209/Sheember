import { useContext } from 'react';
import { AdsContext } from '../context';

const useAds = () => {
  return useContext(AdsContext);
};

export default useAds;
