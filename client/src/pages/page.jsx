import React from 'react';
import { Header } from '../components/layout';
import { Outlet } from 'react-router-dom';

function Page() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Page;
