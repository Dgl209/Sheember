import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmptyPage from '../../../../pages/empty/empty';
import { getAccountData } from '../../../../store/account/account.selectors';
import { getAds } from '../../../../store/ads/ads.selectors';
import { loadCollection } from '../../../../store/ads/ads.actions';
import { List } from '../../../common';
import { Ad } from '../../';
import { AdsLoader } from '../../../../hoc';

function Wishlist() {
  const accountData = useSelector(getAccountData());
  const dispatch = useDispatch();
  const ads = useSelector(getAds());
  const AdsList = List(Ad);

  if (!accountData.wishlist) {
    return (
      <div className="flex flex-col w-full justify-center items-center space-y-2 h-[80vh]">
        <EmptyPage title="Wish list is empty" btnTitle="Main page" path="/" />
      </div>
    );
  }

  useEffect(() => {
    dispatch(loadCollection(accountData.wishlist));
  }, []);

  return (
    <AdsLoader>
      {ads?.length ? (
          <AdsList items={ads} columns="4" />
      ) : null}
    </AdsLoader>
  );
}

export default Wishlist;
