'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { registerUser } from '@/actions';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { login } from '@/actions/auth/login';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setErrorMessage('');
    const { name, email, password } = data;
    const resp = await registerUser({ name, email, password });
    console.log(resp);
    if (!resp.success) {
      setErrorMessage(resp.message);
      return;
    }
    await login(email, password);
    window.location.replace('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Name</label>
      <input
        className={clsx('mb-5 w-full rounded border bg-gray-200 px-5 py-2 text-base', {
          'border-red-500': errors.name,
        })}
        type="text"
        {...register('name', { required: true, minLength: 3 })}
      />
      {errors.name && <span className="text-sm text-red-500">Please enter a valid name</span>}

      <label htmlFor="email">Email</label>
      <input
        className={clsx('mb-5 w-full rounded border bg-gray-200 px-5 py-2 text-base', {
          'border-red-500': errors.email,
        })}
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && <span className="text-sm text-red-500">Please enter a valid email address</span>}

      <label htmlFor="password">Password</label>
      <div className="relative w-full">
        <button
          type="button"
          className="absolute right-5 top-3 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
        <input
          className={clsx('mb-5 w-full rounded border bg-gray-200 px-5 py-2 pr-10 text-base', {
            'border-red-500': errors.password,
          })}
          type={showPassword ? 'text' : 'password'}
          {...register('password', { required: true, minLength: 8 })}
          id="password"
          name="password"
          required
        />
      </div>
      {errors.password && <span className="text-sm text-red-500">Password must be at least 8 characters long</span>}

      {errorMessage && <span className="text-red-500">{errorMessage}</span>}

      <button type="submit" className="btn-primary mt-6">
        Create account
      </button>

      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};

export default RegisterForm;
