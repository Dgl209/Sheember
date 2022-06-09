import React, { useContext } from 'react';
import { ModalContext } from '../../../context';
import { Registration } from '../index';
import { LoginForm } from '../../ui';

function Login() {
  const { setModalContent } = useContext(ModalContext);

  return (
    <>
      <LoginForm />
      <div className="flex items-center px-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-300">No registered? </p>
        <button
          type="button"
          className="text-blue-600 font-medium px-1 hover:underline dark:text-blue-500"
          onClick={() =>
            setModalContent({
              title: 'Sing up',
              closable: true,
              content: <Registration />,
            })
          }
        >
          Create account
        </button>
      </div>
    </>
  );
}

export default Login;
