import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import firebaseService from './firebase.service';
import { toast } from 'react-toastify';

const firebaseStorage = getStorage(firebaseService);

const downloadImage = async (path) => {
  try {
    const imgRef = ref(firebaseStorage, path);
    const url = await getDownloadURL(imgRef);
    return url;
  } catch (error) {
    const { message } = error;
    toast.error(message);
  }
};

const uploadAdImagesArray = async (fileArray, id) => {
  try {
    if (!fileArray) {
      const errorMessage = 'Failed to load image, please try again later';
      throw errorMessage;
    }
    return await fileArray?.map(async (file, index) => {
      const fileRef = ref(firebaseStorage, `/adImages/${id}/${index}`);
      await uploadBytes(fileRef, file[0]);
      return await getDownloadURL(fileRef);
    });
  } catch (error) {
    toast.error(error);
  }
};

const uploadSubcategoriesImages = async (files) => {
  console.log('files: ', files);
  try {
    if (!files) {
      const errorMessage = 'Failed to load image, please try again later';
      throw errorMessage;
    }
    return Object.keys(files).map(async (file) => {
      const fileRef = ref(firebaseStorage, `/subcategories/${file}`);
      await uploadBytes(fileRef, files[file][0]);
      const url = await getDownloadURL(fileRef);
      return { name: file, url };
    });
  } catch (error) {
    toast.error(error);
  }
};

const storageService = {
  downloadImage,
  uploadAdImagesArray,
  uploadSubcategoriesImages,
};

export default storageService;
