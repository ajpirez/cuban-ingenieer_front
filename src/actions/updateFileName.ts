'use server';

import { CustomHeaders } from '@/actions/helpers';
import { BASE_URL } from '@/actions/auth/auth';
import { revalidatePath } from 'next/cache';

interface UpdateFileName {
  id: string;
  name: string;
}

export const updateFileName = async ({ id, name }: UpdateFileName) => {
  try {
    const requestOptions = await CustomHeaders({
      method: 'PATCH',
      body: JSON.stringify({ name }),
      contentType: 'application/json',
      isSecurePath: true,
    });

    const res = await fetch(`${BASE_URL}/file/${id}`, {
      ...requestOptions,
      cache: 'no-store',
    });

    if (res.status === 401) {
      return { status: 401, message: 'Unauthorized' };
    }

    if (!res.ok) {
      const data = await res.json();
      return { success: false, message: data.message || 'Something went wrong', status: res.status };
    }

    const data = await res.json();
    revalidatePath('/uploads');
    return { data, success: true };
  } catch (e: any) {
    return { success: false, message: e.message || 'An error occurred' };
  }
};
