import { CustomHeaders } from '@/actions/helpers';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const requestOptions = await CustomHeaders({
      method: 'POST',
      body: JSON.stringify({ email, password }),
      contentType: 'application/json',
      isSecurePath: false,
    });

    const res = await fetch(`${BASE_URL}/auth/sign-in`, requestOptions);
    const data = await res.json();

    if (data.status === 200) {
      return data.data;
    }

    if (data.status === 401) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error('error');
  }
};
