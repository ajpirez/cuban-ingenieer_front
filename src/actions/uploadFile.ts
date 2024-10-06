'use server';

import { BASE_URL } from '@/actions/auth/auth';
import { CustomHeaders } from '@/actions/helpers';

export async function uploadFile(_: any, formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const requestOptions = await CustomHeaders({
      method: 'POST',
      body: formData,
      isSecurePath: true,
    });

    const res = await fetch(`${BASE_URL}/file/upload`, {
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
    return { data, success: true };
  } catch (e: any) {
    return { success: false, message: e.message || 'An error occurred' };
  }
}
