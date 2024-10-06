'use server';

import { BASE_URL } from '@/actions/auth/auth';
import { CustomHeaders } from '@/actions/helpers';

interface DownloadFile {
  id: string;
}

export async function downloadFile({ id }: DownloadFile) {
  try {
    const requestOptions = await CustomHeaders({
      method: 'GET',
      isSecurePath: true,
    });

    const res = await fetch(`${BASE_URL}/file/download/${id}`, {
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

    const blob = await res.blob();
    return { blob, success: true };
  } catch (e: any) {
    return { success: false, message: e.message || 'An error occurred' };
  }
}
