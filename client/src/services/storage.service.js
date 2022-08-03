import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import firebaseService from './firebase.service';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

const firebaseStorage = getStorage(firebaseService);

/* const downloadImage = async (path) => {
  try {
    const imgRef = ref(firebaseStorage, path);
    const url = await getDownloadURL(imgRef);
    return url;
  } catch (error) {
    const { message } = error;
    toast.error(message);
  }
}; */

const uploadAdImagesArray = async (fileArray) => {
  const id = nanoid();
  try {
    if (!fileArray) {
      const errorMessage = 'Failed to load image, please try again later';
      throw errorMessage;
    }
    return await fileArray?.map(async (file, index) => {
      if (typeof file !== 'string') {
        const fileRef = ref(firebaseStorage, `/adImages/${id}/${index}`);
        await uploadBytes(fileRef, file[0]);
        return await getDownloadURL(fileRef);
      }
      return file;
    });
  } catch (error) {
    toast.error(error);
  }
};

const uploadSubcategoriesImages = async (files) => {
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
  uploadAdImagesArray,
  uploadSubcategoriesImages,
};

export default storageService;
