import React from 'react';
import { PostNewAdForm } from '../../components/ui';

function PostNewAd() {
  return (
    <div className="container mx-auto mb-10 bg-gray-50 dark:bg-gray-900">
      <h1 className="my-6 text-4xl font-medium dark:text-white">Post new ad</h1>
      <PostNewAdForm />
    </div>
  );
}

export default PostNewAd;
