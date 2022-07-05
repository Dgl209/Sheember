import React, { useEffect } from 'react';
import { List } from '../../../common';
import Ad from '../../ads/ad';
import { useDispatch, useSelector } from 'react-redux';
import { loadAds } from '../../../../store/ads/ads.actions';
import { getAds } from '../../../../store/ads/ads.selectors';
import { getAccountId } from '../../../../store/auth/auth.selectors';
import { AdsLoader } from '../../../../hoc';

function PublishedAds() {
  const currentUserId = useSelector(getAccountId());
  const dispatch = useDispatch();
  const ads = useSelector(getAds());
  const AdsList = List(Ad);

  useEffect(() => {
    dispatch(loadAds('publisher', currentUserId));
  }, []);

  return (
    <AdsLoader>
      <AdsList items={ads} columns="4" />
    </AdsLoader>
  );
}

export default PublishedAds;
