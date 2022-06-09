import React, { useContext } from 'react';
import { ModalContext } from '../../../context';
import { Login } from '../index';
import { RegistrationForm } from '../../ui';

function Registration() {
  const { setModalContent } = useContext(ModalContext);

  return (
    <>
      <RegistrationForm />
      <div className="flex items-center">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Already registered? </p>
        <button
          type="button"
          className="text-blue-600 font-medium px-1 hover:underline dark:text-blue-500"
          onClick={() => setModalContent({ title: 'Sing in', closable: true, content: <Login /> })}
        >
          Sing in
        </button>
      </div>
    </>
  );
}

export default Registration;
