import React from 'react';
import { Orders, PersonalData, PublishedOrders, Wishlist } from '../components/ui';

const cabinetRoutes = [
  {
    path: '/cabinet/personal-data',
    element: <PersonalData />,
  },
  {
    path: '/cabinet/orders',
    element: <Orders />,
  },
  {
    path: '/cabinet/wishlist',
    element: <Wishlist />,
  },
  {
    path: '/cabinet/published-orders',
    element: <PublishedOrders />,
  },
];

export default cabinetRoutes;
