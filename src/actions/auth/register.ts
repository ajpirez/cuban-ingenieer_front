'use server';

import { CustomHeaders } from '@/actions/helpers';
import { BASE_URL } from '@/actions/auth/auth';

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: FormInputs) => {
  try {
    const requestOptions = await CustomHeaders({
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      contentType: 'application/json',
      isSecurePath: false,
    });

    const res = await fetch(`${BASE_URL}/auth/sign-up`, {
      ...requestOptions,
      cache: 'no-store',
    });

    const data = await res.json();
    if (res.status === 401) {
      return { status: 401, message: data.message };
    }

    if (res.status === 422) {
      const errorMessages = [];

      if (data.errors.password) {
        errorMessages.push(`Password: ${data.errors.password}`);
      }
      if (data.errors.name) {
        errorMessages.push(`Name: ${data.errors.name}`);
      }
      if (data.errors.email) {
        errorMessages.push(`Email: ${data.errors.email}`);
      }

      return {
        success: false,
        status: 422,
        message: errorMessages.join(' | '),
      };
    }

    if (!res.ok) {
      return { success: false, message: data.message, status: res.status };
    }

    return { data, success: true };
  } catch (e: any) {
    return { success: false, message: e.message };
  }
};
