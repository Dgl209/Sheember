import React, { useContext } from 'react';
import { ModalContext } from '../../../context';
import { Login } from '../index';
import { useForm } from 'react-hook-form';
import { RegistrationForm } from '../../ui';

function Registration() {
  const { setContent } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log('registration form: ', data);

  return (
    <>
      <RegistrationForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} />
      <div className="flex items-center">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Already registered? </p>
        <button
          type="button"
          className="text-blue-600 font-medium px-1 hover:underline dark:text-blue-500"
          onClick={() => setContent({ title: 'Sing in', closable: true, content: <Login /> })}
        >
          Sing in
        </button>
      </div>
    </>
  );
}

export default Registration;
