import { getStorage, getDownloadURL, ref } from 'firebase/storage';
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

const storageService = {
  downloadImage,
};

export default storageService;
