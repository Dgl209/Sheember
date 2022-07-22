import React from 'react';
import { PostAdForm } from '../../components/ui';

function EditAd() {
  return (
    <div className="container mx-auto mb-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="my-6 text-4xl font-medium dark:text-white">Edit ad</h1>
      <PostAdForm />
    </div>
  );
}

export default EditAd;
