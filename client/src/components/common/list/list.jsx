import React from 'react';
import PropTypes from 'prop-types';

const List = (Component) => {
  const wrapper = ({ items, columns }) => {
    return (
      <div className={`w-full h-full grid grid-cols-${columns || '4'} place-items-center`}>
        {items?.map((item) => {
          return <Component key={item.id} {...item} />;
        })}
      </div>
    );
  };
  wrapper.propTypes = {
    items: PropTypes.array,
    columns: PropTypes.string,
  };
  return wrapper;
};

List.propTypes = {
  Component: PropTypes.element,
};

export default List;
