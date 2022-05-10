import React, { useContext } from 'react';
import { ModalContext } from '../../context';
import { Login } from '../index';
import { useForm } from 'react-hook-form';
import { TextField } from '../../components/common';

function Registration() {
  const { setContent } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          register={register}
          type="text"
          label="Name"
          options={{
            required: 'Name is required field',
            pattern: {
              value: /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/g,
              message: 'Name entered incorrectly',
            },
          }}
          error={errors.name?.message}
        />
        <TextField
          id="surname"
          register={register}
          type="text"
          label="Surname"
          options={{
            required: 'Surname is required field',
            pattern: {
              value: /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/g,
              message: 'Name entered incorrectly',
            },
          }}
          error={errors.surname?.message}
        />
        <TextField
          id="email"
          register={register}
          type="text"
          label="Email"
          options={{
            required: 'Email is required field',
            pattern: {
              value: /^\S+@\S+\.\S+$/g,
              message: 'Email entered incorrectly',
            },
          }}
          error={errors.email?.message}
        />
        <TextField
          id="password"
          register={register}
          type="password"
          label="Create password"
          options={{
            required: 'Password is required',
            pattern: {
              value: /\d+/g,
              message: 'Password must contain at least one number',
            },
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
          error={errors.password?.message}
        />
        <TextField
          id="repeat-password"
          register={register}
          type="password"
          label="Repeat password"
          options={{
            required: 'Repeat password is required',
            pattern: {
              value: /\d+/g,
              message: 'Password must contain at least one number',
            },
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
          error={errors.password?.message}
        />
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
         font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
      <div className="flex">
        <p className="text-gray-700">Already registered? </p>
        <button
          type="button"
          className="text-blue-700 font-medium px-1 hover:text-blue-500"
          onClick={() => setContent({ title: 'Sing in', closable: true, content: <Login /> })}
        >
          Sing in
        </button>
      </div>
    </>
  );
}

export default Registration;
