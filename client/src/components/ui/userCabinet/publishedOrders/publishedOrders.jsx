import React, { useEffect } from 'react';
import { useAds, useAuth } from '../../../../hooks';
import { List } from '../../../common';
import Ad from '../../ads/ad';

function PublishedOrders() {
  const { currentUser } = useAuth();
  const { ads, getAds } = useAds();
  const AdsList = List(Ad);

  useEffect(() => {
    getAds('"publisher"', currentUser.id);
  }, []);

  return <AdsList items={ads} columns="4" />;
}

export default PublishedOrders;
