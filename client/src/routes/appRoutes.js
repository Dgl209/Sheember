import React from 'react';
import { Home, NotFound } from '../pages';

const appRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default appRoutes;
