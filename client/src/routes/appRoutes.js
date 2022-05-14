import React from 'react';
import { Main, NotFound } from '../pages';

const appRoutes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default appRoutes;
