import React from 'react';
import { AdDetails } from '../components/ui';
import { PrivateRoute } from '../hoc';
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
    path: '/:adId',
    element: <AdDetails />,
  },
  {
    path: '/post-new-ad',
    element: (
      <PrivateRoute>
        <PostNewAd />
      </PrivateRoute>
    ),
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
    element: (
      <PrivateRoute>
        <UserCabinet />
      </PrivateRoute>
    ),
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
