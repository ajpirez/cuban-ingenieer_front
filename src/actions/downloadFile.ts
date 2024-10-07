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
    const arrayBuffer = await blob.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');

    const contentDisposition = res.headers.get('content-disposition');
    let filename = 'downloaded-file.zip';

    if (contentDisposition && contentDisposition.includes('filename=')) {
      filename = contentDisposition.split('filename=')[1].replace(/"/g, '').trim();
    }

    return { base64: base64String, success: true, mimeType: blob.type, filename };
  } catch (e: any) {
    return { success: false, message: e.message || 'An error occurred' };
  }
}
