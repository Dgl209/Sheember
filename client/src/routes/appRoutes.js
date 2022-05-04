import React from 'react';
import { Home, Login, NotFound, Registration } from '../pages';

const appRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default appRoutes;
