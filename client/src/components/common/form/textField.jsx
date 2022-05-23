import React from 'react';
import PropTypes from 'prop-types';

function TextField({ register, label, placeholder, type, id, options, error }) {
  const getInputClasses = () => {
    return (
      'shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg' +
      ' block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600' +
      ' dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ' +
      (error
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500')
    );
  };

  return (
    <div className="mb-6">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={getInputClasses()}
        placeholder={placeholder || ''}
        {...register(id, { ...options })}
      />
      {error && <p className="text-[#f84147] text-[12px] mt-1 pl-1">{error}</p>}
    </div>
  );
}

TextField.defaultProps = {
  type: 'text',
};

TextField.propTypes = {
  register: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.object,
  error: PropTypes.string,
};

export default TextField;
