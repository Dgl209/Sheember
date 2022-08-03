import adsSlice from './ads.slice';
import adsServices from '../../services/ads.services';
import { handleError } from '../errors/errors.actions';
import { storageService } from '../../services';
import { createAction } from '@reduxjs/toolkit';
import { customHistory } from '../../utils/helpers';

const { requested, received, failed, created, removed, updated } = adsSlice.actions;
const creationRequested = createAction('ads/creationRequested');
const creationFailed = createAction('ads/creationFailed');
const editRequested = createAction('ads/editRequested');
const editFailed = createAction('ads/editFailed');
const removeRequested = createAction('ads/removeRequested');
const removeFailed = createAction('ads/removeFailed');

const loadAds = (orderBy, value) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await adsServices.get(orderBy, value);
    dispatch(received(content));
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
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const loadCollection = (array) => async (dispatch) => {
  dispatch(requested());
  try {
    const { content } = await adsServices.getCollection(array);
    dispatch(received(content));
  } catch (error) {
    dispatch(failed());
    dispatch(handleError(error));
  }
};

const createAd = (data) => async (dispatch) => {
  dispatch(creationRequested());
  try {
    const adImages = await storageService.uploadAdImagesArray(data.adImages);
    const adImagesUrl = await Promise.all(adImages);
    const newData = {
      ...data,
      adImagesUrl,
    };
    await adsServices.create(newData);
    dispatch(created());
    customHistory.push('/result/success', {
      message: 'Published successfully',
      btnTitle: 'Add another ad',
      path: '/post-new-ad',
    });
  } catch (error) {
    dispatch(creationFailed());
    dispatch(handleError(error));
    customHistory.push('/result/fail', { message: 'Publication error' });
  }
};

const editAd = (data) => async (dispatch) => {
  dispatch(editRequested());
  try {
    const adImages = await storageService.uploadAdImagesArray(data.adImages);
    const adImagesUrl = await Promise.all(adImages);
    const newData = {
      ...data,
      adImagesUrl,
    };
    const { content } = await adsServices.edit(newData);
    dispatch(updated(content));
    customHistory.push('/result/success', {
      message: 'The ad has been successfully modified',
      btnTitle: 'Come back to the ad',
      path: `/${content.id}`,
    });
  } catch (error) {
    dispatch(editFailed());
    dispatch(handleError(error));
    customHistory.push('/result/fail', { message: 'An error occurred, please try again later' });
  }
};

const removeAd = (id) => async (dispatch) => {
  dispatch(removeRequested());
  try {
    const { content } = await adsServices.remove(id);
    if (content === null) {
      dispatch(removed(id));
    }
    customHistory.push('/result/success', {
      message: 'Ad has been removed',
      btnTitle: 'Publish new ad',
      path: '/post-new-ad',
    });
  } catch (error) {
    dispatch(removeFailed());
    dispatch(handleError(error));
    customHistory.push('/result/fail', { message: 'An error occurred, please try again later' });
  }
};

export { loadAds, loadAdById, createAd, editAd, removeAd, loadRecentlyAds, loadCollection };
