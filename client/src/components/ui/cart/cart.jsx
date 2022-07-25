import React from 'react';
import { useSelector } from 'react-redux';
import EmptyPage from '../../../pages/empty/empty';
import { getAccountData } from '../../../store/account/account.selectors';
import CartImage from '../../../assets/cart-image.png';
import { CartBtn, WishlistBtn } from '../../common';
import { useModal } from '../../../hooks';

// temp
import Image from '../../../assets/categories/computer-component.png';

/*
 * --- Ad ---
 * 1. + image
 * 2. + name
 * 3. + publisher
 * 4. + price
 * 5. + add to wish list btn
 * 6. + remove from cart btn
 * 7. + time
 *
 * --- bottom of cart ---
 * 1. sum of all ads
 * 2. order btn
 * 3. continue shopping btn
 */

function Cart() {
  const accountData = useSelector(getAccountData());
  const { hideModal } = useModal();

  if (!accountData.cart) {
    return (
      <div className="flex flex-col w-full items-center justify-center space-y-4">
        <img className="w-40" src={CartImage} alt="" />
        <EmptyPage title="Cart is empty" btnTitle="Main page" path="/" />
      </div>
    );
  }

  const handleOrder = () => {
    console.log('ordered all');
  };

  console.log('cart list: ', accountData.cart);

  return (
    <div className="w-full h-full space-y-7">
      {/* for */}

      {new Array(7).fill(null).map((item, index) => (
        <div key={index} className="w-full flex space-x-4 pb-6 border-b border-gray-200 dark:border-gray-600">
          <img src={Image} className="w-28" />
          <div className="w-full space-y-2">
            <div className="w-full flex items-end justify-between">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Computer component</h5>
              <div className="flex items-center space-x-4 ">
                <WishlistBtn className="px-2 py-1 dark:bg-gray-700" iconClassName="w-7 h-7" />
                <CartBtn className="px-2 py-[5px]" iconClassName="w-7 h-7" />
              </div>
            </div>
            <div className="w-full flex items-start justify-between">
              <p className="font-normal text-lg text-gray-700 dark:text-gray-400">Admin Admin - 10:10</p>
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">11500 $</span>
            </div>
          </div>
        </div>
      ))}

      <div className="w-full flex justify-between items-center">
        <button
          type="button"
          onClick={hideModal}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Continue shopping
        </button>
        <div className="flex flex-col space-y-4 px-14 py-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <span className="text-4xl font-semibold text-gray-900 dark:text-white">58000 $</span>
          <button
            type="button"
            onClick={handleOrder}
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Order all
          </button>
        </div>
      </div>

      {/* for */}
    </div>
  );
}

export default Cart;
