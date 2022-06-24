import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAds } from '../../../../hooks';
import Slider from './slider/slider';

function AdDetails() {
  const { adId } = useParams();
  const { ads, getAds, adsLoading } = useAds();

  useEffect(() => {
    getAds('"id"', adId);
  }, []);

  return (
    <div className='container mx-auto flex justify-center mt-8'>
      {!adsLoading && (
        <div className="container max-w-5xl">
          <Slider items={ads[0]?.adImagesUrl} />;
        </div>
      )}
    </div>
  );
}
export default AdDetails;
