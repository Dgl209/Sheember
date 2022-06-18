import { useContext } from 'react';
import { ConstantsContext } from '../context';

const useConstants = () => {
  return useContext(ConstantsContext);
};

export default useConstants;
