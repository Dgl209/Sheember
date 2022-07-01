import React from 'react';
import { useSelector } from 'react-redux';
import { getAdsLoadingStatus } from '../../store/ads/ads.selectors';
import { Spinner } from '../../components/layout';
import PropTypes from 'prop-types';

function AdsLoader({ children }) {
  const isLoading = useSelector(getAdsLoadingStatus());

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Spinner />
        <p className="dark:text-white">Loading ads...</p>
      </div>
    );
  }
  return children;
}

AdsLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default AdsLoader;
