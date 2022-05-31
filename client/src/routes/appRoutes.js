import React from 'react';
import { Catalog, Main, NotFound, PostNewAd, UserCabinet } from '../pages';

const appRoutes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/post-new-ad',
    element: <PostNewAd />,
  },
  {
    path: '/catalog/:mainCategory',
    element: <Catalog />,
  },
  {
    path: '/catalog/:mainCategory/:subCategory',
    element: <Catalog />,
  },
  {
    path: '/cabinet/:item',
    element: <UserCabinet />,
  },
];

export default appRoutes;
