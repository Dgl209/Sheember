import adsSlice from './ads.slice';
import adsServices from '../../services/ads.services';
import { handleError } from '../errors/errors.actions';
import { nanoid } from 'nanoid';
import { storageService } from '../../services';
import { createAction } from '@reduxjs/toolkit';
import { customHistory, sortHelper } from '../../utils/helpers';

const { requested, received, failed, created } = adsSlice.actions;
const creationRequested = createAction('ads/creationRequested');
const creationFailed = createAction('ads/creationFailed');

const loadAds = (orderBy, value) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await adsServices.get(orderBy, value);
    const sortedContent = sortHelper(content || []);
    dispatch(received(sortedContent));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const loadAdById = (id) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await adsServices.getById(id);
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const loadRecentlyAds = () => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await adsServices.getRecently();
    const sortedContent = sortHelper(content || []);

    if (sortedContent.length <= 10) {
      dispatch(received(sortedContent));
    } else {
      const recently = sortedContent.slice(0, 12);
      dispatch(received(recently));
    }
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const createAd = (data) => async (dispatch, getState) => {
  dispatch(creationRequested());
  const currentUserId = getState().auth.accountId;
  try {
    const id = nanoid();
    const adImages = await storageService.uploadAdImagesArray(data.adImages, id);
    const adImagesUrl = await Promise.all(adImages);
    const newData = {
      ...data,
      adImagesUrl,
      id,
      created_at: Date.now(),
      publisher: currentUserId,
    };
    await adsServices.create(newData);
    dispatch(created());
    customHistory.push('/result/success', { message: 'Published successfully' });
  } catch (error) {
    console.log('create error : ', error);
    dispatch(creationFailed());
    dispatch(handleError(error));
    customHistory.push('/result/fail', { message: 'Publication error' });
  }
};

export { loadAds, loadAdById, createAd, loadRecentlyAds };
