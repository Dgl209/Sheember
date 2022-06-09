import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Ad, SubCategory } from '../../components/ui';
import { useSubCategories } from '../../hooks';
import { List } from '../../components/common';

function Catalog() {
  const { mainCategory, subCategory } = useParams();
  const { loading, subCategories, fetchSubCategories } = useSubCategories();
  const selectedSubCategories = subCategories.filter((x) => x.parent_id === mainCategory);
  const SubCategoriesList = List(SubCategory);
  const AdsList = List(Ad);

  useEffect(() => {
    if (!subCategory) {
      fetchSubCategories();
    }
  }, []);

  return (
    <div className="p-6">
      {!subCategory ? (
        !loading && <SubCategoriesList items={selectedSubCategories} columns="5" />
      ) : (
        <AdsList items={[]} columns="4" />
      )}
    </div>
  );
}

export default Catalog;
