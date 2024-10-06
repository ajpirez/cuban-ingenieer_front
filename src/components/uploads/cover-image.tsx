'use client';

import { useActionState, useEffect } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { FaUpload } from 'react-icons/fa';
import { uploadFile } from '@/actions/uploadFile';
import { useRouter } from 'next/navigation';

export function CoverImage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(uploadFile, {
    success: false,
    message: '',
  });

  console.log({ state });

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state]);

  return (
    <form action={formAction}>
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
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              if (file.size <= 5 * 1024 * 1024) {
                e.target.form?.requestSubmit();
              } else {
                alert('File size exceeds 5MB limit');
                e.target.value = '';
              }
            }
          }}
        />
        {pending ? (
          <LuLoader2 className="h-5 w-5 animate-spin text-neutral-600" />
        ) : (
          <>
            <FaUpload className="mb-1 h-3 w-3" />
            <span className="text-center text-xs">Upload</span>
          </>
        )}
      </label>
    </form>
  );
}
