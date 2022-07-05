import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import WishlistBtn from './wishlistBtn/wishlistBtn';
import CartBtn from './cartBtn/cartBtn';
import { getDateHelper } from '../../../utils/helpers';
import { toast } from 'react-toastify';
import { userService } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { updateWishlist } from '../../../store/account/account.actions';
import { getAccountData } from '../../../store/account/account.selectors';

function Ad({ item }) {
  const [user, setUser] = useState();
  const accountData = useSelector(getAccountData());
  const [inWishlist, setInWishlist] = useState(accountData.wishlist?.includes(item.id));
  const dispatch = useDispatch(true);

  const handleCart = () => {
    console.log('added to cart - ', item.name);
  };

  const handleWishList = () => {
    dispatch(updateWishlist(item.id));
    setInWishlist((prev) => !prev);
  };

  useEffect(() => {
    async function loadUserById() {
      try {
        const { content } = await userService.getUserById(item.publisher);
        setUser(content);
      } catch (error) {
        toast.error(error.message);
      }
    }
    loadUserById();
  }, []);

  return (
    <div className="w-[240px] h-[316px] relative border border-gray-200 mb-4 dark:bg-gray-800 p-2 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <Link to={`/${item.id}`}>
          <img className="w-full h-48" src={item.adImagesUrl[0]} alt="" />
        </Link>
        <div className="py-2 space-y-3">
          <Link to={`/${item.id}`}>
            <h5 className="text-base mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
          </Link>
          <div>
            <h5 className="text-sm text-gray-500 dark:text-gray-400">
              {user?.name} {user?.surname} - {getDateHelper(item.created_at)}
            </h5>
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                {item.price ? '$' + item.price : 'Exchange'}{' '}
              </span>
              <div className="flex items-center">
                <WishlistBtn
                  className="px-2 py-1 mr-2"
                  iconClassName="w-4 h-4"
                  inWishlist={inWishlist}
                  handleClick={handleWishList}
                />
                <CartBtn className="px-[9px] py-[5px]" iconClassName="w-4 h-4" handleClick={handleCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Ad.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Ad;
