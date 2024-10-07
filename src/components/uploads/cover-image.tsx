'use client';

import React from 'react';
import { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { FaUpload } from 'react-icons/fa';
import { uploadFile } from '@/actions/uploadFile';
import { useRouter } from 'next/navigation';

export function CoverImage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) {
        const formData = new FormData();
        formData.append('file', file);

        setPending(true);
        try {
          const response = await uploadFile(formData);
          if (response.success) {
            setMessage(response.message || 'File uploaded successfully');
            router.refresh();
          } else {
            setMessage(response.message || 'File upload failed');
          }
        } catch (error) {
          setMessage('An error occurred during file upload');
        } finally {
          setPending(false);
        }
      } else {
        alert('File size exceeds 5MB limit');
        e.target.value = '';
      }
    }
  };

  return (
    <form>
      <label
        htmlFor="coverUpload"
        className="flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded border border-dashed border-neutral-700 text-white sm:h-20 sm:w-20"
      >
        <input
          id="coverUpload"
          type="file"
          name="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {pending ? (
          <LuLoader2 className="h-5 w-5 animate-spin text-neutral-600" />
        ) : (
          <>
            <FaUpload className="mb-1 h-3 w-3 text-black" />
            <span className="text-center text-xs font-bold text-black">Upload</span>
          </>
        )}
      </label>
      {message && <p className="mt-2 text-sm text-black">{message}</p>}
    </form>
  );
}
