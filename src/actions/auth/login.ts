// 'use server';
import { signIn } from 'next-auth/react';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const res = await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    if (res?.error) {
      return 'CredentialsSignin';
    }

    return 'Success';
  } catch (error) {
    return 'CredentialsSignin';
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      ...{ email, password },
      redirect: false,
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'no se pudo iniciar sessión',
    };
  }
};
