import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from './slider/slider';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdById } from '../../../store/ads/ads.actions';
import { getAds } from '../../../store/ads/ads.selectors';
import { AdsLoader } from '../../../hoc';
import { Card, TextAreaField } from '../../common';
import { getDateHelper } from '../../../utils/helpers';
import { userService } from '../../../services';
import { UserIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';

function AdDetails() {
  const { adId } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAds());
  const ad = ads?.find(() => true);
  const [user, setUser] = useState();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(loadAdById(adId));
  }, []);

  useEffect(() => {
    loadUserById(ad?.publisher);
  }, [ad]);

  function onSubmit(data) {
    console.log('onSubmit: ', data);
  }

  async function loadUserById(id) {
    try {
      const { content } = await userService.getUserById(id);
      setUser(content);
    } catch (error) {}
  }

  return (
    <AdsLoader>
      <div className="container mx-auto px-4 flex justify-center mt-6 mb-6">
        <div className="container space-y-6">
          <Slider items={ad?.adImagesUrl} />
          <Card className="w-full">
            <time className="mb-1 text-xl font-normal leading-none text-gray-400 dark:text-gray-500">
              {getDateHelper(ad?.created_at)}
            </time>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{ad?.name}</h3>
            <p className="mb-2 text-xl font-normal text-gray-500 dark:text-gray-400">{ad?.description}</p>
            <span className="text-3xl font-semibold text-gray-900 dark:text-white">{ad?.price} $</span>
            <div className="flex w-full justify-between mt-5">
              <div className="flex items-center">
                <UserIcon className="w-8 ml-0 h-8 mr-2 dark:text-white" />
                <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {user?.name} {user?.surname}
                </h4>
              </div>
              <div className="flex items-center px-5">
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg
                text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white
                dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <HeartIcon className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="focus:outline-none flex items-center text-white bg-purple-700 hover:bg-purple-800
                focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-bold px-5 py-2.5 mb-2
                dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Buy
                </button>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-2xl mb-4 font-semibold text-gray-900 dark:text-white">Comments</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextAreaField register={register} id="comment" placeholder="Leave a comment" rows="3" />
              <button
                type="submit"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none
                hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg
                text-bold px-5 py-2.5 mr-2 mb-2 mt-4 dark:bg-gray-800 dark:text-white dark:border-gray-600
                dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Send
              </button>
            </form>
          </Card>
        </div>
      </div>
    </AdsLoader>
  );
}
export default AdDetails;
