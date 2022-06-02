import React from 'react';
import { Orders, PersonalData, Wishlist } from '../../components/ui';
import { faUser, faListCheck, faHeart } from '@fortawesome/free-solid-svg-icons';

export const userCabinetItemsListConstants = [
  {
    id: 'personal-data',
    label: 'User Name',
    icon: faUser,
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: faListCheck,
  },
  {
    id: 'wishlist',
    label: 'Wish list',
    icon: faHeart,
  },
];

export const userCabinetComponentsConstants = {
  'personal-data': <PersonalData />,
  orders: <Orders />,
  wishlist: <Wishlist />,
};
