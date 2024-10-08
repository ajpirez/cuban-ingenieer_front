'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { auth } from '@/auth.config';

export const getToken = async () => {
  try {
    const session = await auth();
    return session?.user.accessToken;
  } catch (e) {
    return '';
  }
};

export const getSessionUser = async () => {
  try {
    const session = await auth();

    //@ts-ignore
    return session?.user;
  } catch (e) {
    return null;
  }
};
export const CustomHeaders = async ({
  method = 'GET',
  body,
  contentType,
  isSecurePath = true,
}: {
  method: string;
  body?: any;
  contentType?: string;
  isSecurePath?: boolean;
}) => {
  const defaultHeaders = {
    Origin: `${process.env.NEXT_PUBLIC_DOMAIN}`,
  };
  const optionsR: any = {
    // mode: 'cors',
    method,
    // credentials: 'include',
    headers: { ...defaultHeaders },
  };

  if (contentType) {
    optionsR.headers['Content-Type'] = contentType;
  }

  if (isSecurePath) {
    optionsR.headers.Authorization = `Bearer ${await getToken()}`;
  }

  if (body) {
    optionsR.body = body;
  }

  return optionsR;
};

export const customRevalidateTag = async (tag: string) => {
  revalidateTag(tag);
};

export const RevalidatePath = async (path: string) => {
  revalidatePath(path, 'page');
};
