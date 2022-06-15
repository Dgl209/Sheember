import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import storageService from '../../../services/storage.service';

function SubCategory({ item }) {
  const { mainCategory } = useParams();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    storageService.downloadImage(`/subCategories/${item.image}`).then((url) => setImageUrl(url));
  }, []);

  return (
    <div className="w-[240px] h-[280px] border border-gray-200 mb-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full h-[200px] flex items-center justify-center">
        <Link to={`/catalog/${mainCategory}/${item.id}`}>
          <img width={200} src={imageUrl} alt="" />
        </Link>
      </div>
      <div className="flex justify-center items-center h-[80px]">
        <Link
          to={`/catalog/${mainCategory}/${item.id}`}
          className="text-lg font-normal mb-2 text-gray-900 hover:text-sky-700 hover:underline dark:text-white"
        >
          {item.name}
        </Link>
      </div>
    </div>
  );
}

SubCategory.propTypes = {
  item: PropTypes.object.isRequired,
  mainCategory: PropTypes.string,
};

export default SubCategory;
