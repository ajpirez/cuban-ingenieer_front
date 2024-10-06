'use server';

import { CustomHeaders } from '@/actions/helpers';
import { BASE_URL } from '@/actions/auth/auth';

interface ListFilesParams {
  page?: number;
  limit?: number;
}

export const listFileByUser = async ({ page = 1, limit = 10 }: ListFilesParams) => {
  try {
    const requestOptions = await CustomHeaders({
      method: 'GET',
      isSecurePath: true,
    });

    const res = await fetch(`${BASE_URL}/file?page=${page}&limit=${limit}`, {
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
};
