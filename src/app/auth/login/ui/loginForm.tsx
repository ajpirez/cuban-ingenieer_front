'use client';

import { useFormState, useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/actions';
import Link from 'next/link';
import { IoInformationOutline } from 'react-icons/io5';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [router, state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="mb-5 w-full rounded border bg-gray-200 px-5 py-2 text-base"
        type="email"
        id="email"
        name="email"
      />

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
          className="mb-5 w-full rounded border bg-gray-200 px-5 py-2 pr-10 text-base"
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          required
        />
      </div>

      <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
        {state === 'CredentialsSignin' && (
          <div className="m-auto mb-2 flex">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Invalid credentials</p>
          </div>
        )}
      </div>

      <PendingButton />

      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create account
      </Link>
    </form>
  );
};

export default LoginForm;

function PendingButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
      })}
      disabled={pending}
    >
      Login
    </button>
  );
}
