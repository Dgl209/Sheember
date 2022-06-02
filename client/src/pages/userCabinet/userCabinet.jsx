import React from 'react';
import { useParams } from 'react-router-dom';
import { userCabinetItemsListConstants, userCabinetComponentsConstants } from '../../utils/constants';
import { GroupList } from '../../components/common';

/*
    1. personal-data - data about user
    2. orders - Ads that user has ordered and their status
    3. wishlist
    4. cart
*/

function UserCabinet() {
  const { item } = useParams();

  return (
    <div className="container mx-auto flex">
      <div className="w-[26%] pt-6 border-r border-gray-200 dark:border-gray-600">
        <GroupList items={userCabinetItemsListConstants} />
      </div>
      <div className="w-full flex justify-center pt-6">{userCabinetComponentsConstants[item]}</div>
    </div>
  );
}

export default UserCabinet;
