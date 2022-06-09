import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupList } from '../../components/common';
import { PersonalData, Orders, Wishlist, PublishedOrders } from '../../components/ui';
import { useCabinetitems } from '../../hooks';

/*
    1. personal-data - data about user
    2. orders - Ads that user has ordered and their status
    3. published-orders (ads that has been published by user)
    4. wishlist
    5. cart
*/

const items = {
  'personal-data': <PersonalData />,
  orders: <Orders />,
  wishlist: <Wishlist />,
  'published-orders': <PublishedOrders />,
};

function UserCabinet() {
  const navigate = useNavigate();
  const { item } = useParams();
  const { fetchCabinetItems, cabinetItems } = useCabinetitems();

  console.log(cabinetItems);

  const handleCabinetItems = ({ id }) => {
    navigate(`/cabinet/${id}`);
  };

  useEffect(() => {
    fetchCabinetItems();
  }, []);

  return (
    <div className="container mx-auto flex">
      <div className="w-[26%] pt-6 border-r border-gray-200 dark:border-gray-600">
        <GroupList items={cabinetItems} onClick={handleCabinetItems} />
      </div>
      <div className="w-full flex justify-center pt-6">{items[item]}</div>
    </div>
  );
}

export default UserCabinet;
