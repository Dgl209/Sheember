import React from 'react';
import { Catalog, Main, NotFound, PostNewAd } from '../pages';

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
    path: '/:mainCategory',
    element: <Catalog />,
  },
  {
    path: '/:mainCategory/:subCategory',
    element: <Catalog />,
  },
];

export default appRoutes;
