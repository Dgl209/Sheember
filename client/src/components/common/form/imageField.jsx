import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CameraIcon } from '@heroicons/react/outline';

function ImageField({ register, id, index, remove, uploadedFile }) {
  const [imageUrl, setImageUrl] = useState(null);

  if (Object.keys(uploadedFile).length) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedFile[0]);
    fileReader.onload = () => setImageUrl(() => fileReader.result);
  }

  return (
    <div className="flex justify-center items-center w-full">
      <label htmlFor={id} className="w-full mr-2 mb-2">
        {!imageUrl ? (
          <div
            className="flex flex-col justify-center items-center w-full h-32
          bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed
          cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100
          dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <CameraIcon className="w-10 h-10 text-gray-400" />
          </div>
        ) : (
          <div className="w-full h-32 hover:opacity-5">
            <img onClick={() => remove(index)} className="w-full h-full rounded-sm" src={imageUrl} />
          </div>
        )}
        {!imageUrl && <input {...register(id)} id={id} type="file" className="hidden" />}
      </label>
    </div>
  );
}

ImageField.propTypes = {
  register: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  uploadedFile: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default ImageField;
