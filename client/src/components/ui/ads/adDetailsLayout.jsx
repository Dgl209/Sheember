import React from 'react';
import PropTypes from 'prop-types';
import { WishlistBtn, CartBtn, Card, Slider } from '../../common';
import { Comments } from '../index';
import { getDateHelper } from '../../../utils/helpers';

function AdDetailsLayout({ ad, adId, user, inWishlist, handleWishlist, inCart, handleCart }) {
  return (
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
                  handleClick={handleWishlist || null}
                  inWishlist={inWishlist || false}
                />
                <CartBtn
                  className="flex items-center px-4 py-2 mb-2"
                  iconClassName="w-5 h-5 mr-2"
                  inCart={inCart || false}
                  handleClick={handleCart || null}
                >
                  {inCart ? 'Remove from cart' : 'Add to cart'}
                </CartBtn>
              </div>
            </div>
          </div>
        </Card>
        {adId ? (
          <Card>
            <h3 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white">Comments</h3>
            <Comments parentId={adId} />
          </Card>
        ) : null}
      </div>
    </div>
  );
}

AdDetailsLayout.propTypes = {
  ad: PropTypes.object,
  adId: PropTypes.string,
  user: PropTypes.object,
  inWishlist: PropTypes.bool,
  inCart: PropTypes.bool,
  handleWishlist: PropTypes.func,
  handleCart: PropTypes.func,
};

export default AdDetailsLayout;
