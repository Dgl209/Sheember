import React from 'react';
import { useSelector } from 'react-redux';
import EmptyPage from '../../../pages/empty/empty';
import { getAccountData } from '../../../store/account/account.selectors';
import CartImage from '../../../assets/cart-image.png';

function Cart() {
  const accountData = useSelector(getAccountData());

  if (!accountData.cart) {
    return (
      <div className="flex flex-col w-full items-center justify-center space-y-4">
        <img className="w-40" src={CartImage} alt="" />
        <EmptyPage title="Cart is empty" btnTitle="Main page" path="/" />
      </div>
    );
  }

  return (
    <div className="w-full h-full items-center justify-center">
      <ul className="dark:text-white">
        {accountData.cart.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
