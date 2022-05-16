import React from 'react';
import { Main, NotFound, PostNewAd } from '../pages';

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
];

export default appRoutes;
