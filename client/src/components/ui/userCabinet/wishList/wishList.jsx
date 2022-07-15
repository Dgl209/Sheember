import React from 'react';
import { useSelector } from 'react-redux';
import EmptyPage from '../../../../pages/empty/empty';
import { getAccountData } from '../../../../store/account/account.selectors';

function Wishlist() {
  const accountData = useSelector(getAccountData());
  if (!accountData.wishlist) {
    return (
      <div className="flex flex-col w-full justify-center items-center space-y-2 h-[80vh]">
        <EmptyPage title="Wish list is empty" btnTitle="Main page" path="/" />
      </div>
    );
  }
  return (
    <ul className="dark:text-white">
      {accountData.wishlist.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default Wishlist;
