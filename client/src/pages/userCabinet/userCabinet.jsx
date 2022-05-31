import React from 'react';
import { useParams } from 'react-router-dom';
import { Orders, PersonalData, Wishlist } from '../../components/ui';

/*
    1. personal-data - data about user
    2. orders - Ads that user has ordered and their status
    3. wishlist
*/

const items = {
  'personal-data': <PersonalData />,
  orders: <Orders />,
  wishlist: <Wishlist />,
};

function UserCabinet() {
  const { item } = useParams();
  return <div className="container mx-auto">{items[item]}</div>;
}

export default UserCabinet;
