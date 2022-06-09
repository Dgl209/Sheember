import { useContext } from 'react';
import { CabinetItemContext } from '../context';

const useCabinetitems = () => {
  return useContext(CabinetItemContext);
};

export default useCabinetitems;
