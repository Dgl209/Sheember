import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdById } from '../../store/ads/ads.actions';
import { getAds } from '../../store/ads/ads.selectors';
import { AdsLoader } from '../../hoc';
import { Card, Slider, WishlistBtn, CartBtn } from '../../components/common';
import { getDateHelper } from '../../utils/helpers';
import { userService } from '../../services';
import { updateCart, updateWishlist } from '../../store/account/account.actions';
import { getAccountData } from '../../store/account/account.selectors';
import { toast } from 'react-toastify';
import { getLoggedInStatus } from '../../store/auth/auth.selectors';
import Comments from '../../components/ui/comments/comments';

function AdDetails() {
  const { adId } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAds());
  const ad = ads?.find(() => true);
  const [user, setUser] = useState();
  const accountData = useSelector(getAccountData());
  const isLoggedIn = useSelector(getLoggedInStatus());
  const [inWishlist, setInWishlist] = useState(accountData?.wishlist?.includes(adId));
  const [inCart, setInCart] = useState(accountData?.cart?.includes(adId));

  useEffect(() => {
    dispatch(loadAdById(adId));
  }, []);

  function handleWishlist() {
    if (isLoggedIn) {
      dispatch(updateWishlist(adId));
      setInWishlist((prev) => !prev);
    } else {
      toast.error('Register or log in to use the wish list');
    }
  }

  function handleCart() {
    if (isLoggedIn) {
      dispatch(updateCart(adId));
      setInCart((prev) => !prev);
    } else {
      toast.error('Regiter or log in to use cart');
    }
  }

  useEffect(() => {
    async function loadUserById() {
      try {
        const { content } = await userService.getUserById(ad?.publisher);
        setUser(content);
      } catch (error) {
        toast.error(error.message);
      }
    }
    loadUserById();
  }, []);

  return (
    <AdsLoader>
      <div className="container mx-auto px-4 flex justify-center mt-6 mb-6">
        <div className="container space-y-6">
          <Slider items={ad?.adImagesUrl} />
          <Card className="w-full space-y-4">
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">{ad?.name}</h5>
            <div>
              <h6 className="text-base font-normal text-gray-900 dark:text-white">Description:</h6>
              <p className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">{ad?.description}</p>
            </div>
            <div className="space-y-0.5">
              <h5 className="text-base text-gray-500 dark:text-gray-400">
                {user?.name} {user?.surname} {getDateHelper(ad?.created_at)}
              </h5>
              <div className="flex w-full justify-between">
                <span className="text-3xl font-semibold text-gray-900 dark:text-white">{ad?.price} $</span>
                <div className="flex items-center px-5">
                  <WishlistBtn
                    className="px-3 py-1.5 mr-2 mb-2"
                    iconClassName="w-6 h-6"
                    handleClick={handleWishlist}
                    inWishlist={inWishlist}
                  />
                  <CartBtn
                    className="flex items-center px-4 py-2 mb-2"
                    iconClassName="w-5 h-5 mr-2"
                    inCart={inCart}
                    handleClick={handleCart}
                  >
                    {inCart ? 'Remove from cart' : 'Add to cart'}
                  </CartBtn>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white">Comments</h3>
            <Comments parentId={adId} />
          </Card>
        </div>
      </div>
    </AdsLoader>
  );
}
export default AdDetails;
