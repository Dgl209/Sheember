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

const uploadImagesArray = async (fileArray, pathId) => {
  try {
    if (!fileArray) {
      const errorMessage = 'Failed to load image, please try again later';
      throw errorMessage;
    }
    return await fileArray?.map(async (file, index) => {
      const fileRef = ref(firebaseStorage, `/adImages/${pathId}/${index}`);
      await uploadBytes(fileRef, file[0]);
      return await getDownloadURL(fileRef);
    });
  } catch (error) {
    toast.error(error);
  }
};

const storageService = {
  downloadImage,
  uploadImagesArray,
};

export default storageService;
