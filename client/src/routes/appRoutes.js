import React from 'react';
import { Catalog, Main, MockData, NotFound, PostNewAd, ResultPage, UserCabinet } from '../pages';

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
  {
    path: '/mockdata',
    element: <MockData />,
  },
  {
    path: 'result',
    element: <ResultPage />,
  },
];

export default appRoutes;
