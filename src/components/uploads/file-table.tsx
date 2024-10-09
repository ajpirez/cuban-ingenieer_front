'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { UploadButton } from '@/components/uploads/button';
import { downloadFile } from '@/actions/downloadFile';
import { formatFileSize } from '@/components/utils';
import { FileStatus } from '@/app/interfaces/file';
import { useRouter } from 'next/navigation';
import { updateFileName } from '@/actions/updateFileName';
import { v4 as uuid } from 'uuid';
import { toast } from 'sonner';
import { BASE_URL } from '@/actions/auth/auth';
import { removeFileByUser } from '@/actions/removeFileByUser';

function FileRow({
  file,
  index,
  isSelected,
  onSelect,
}: {
  file: any;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [isRename, setIsRename] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(file.file_original_name);

  useEffect(() => {
    if (isRename) {
      inputRef.current?.focus();
    }
  }, [isRename]);

  const handleDownload = async () => {
    const response = await downloadFile({ id: file.id });

    if (response.success) {
      const byteCharacters = atob(response.base64!);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: response.mimeType });

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = response.filename || 'downloaded-file.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      toast.message('📩 File downloaded');
    } else {
      toast.error('Error downloading file');
    }
  };

  const handleRename = async () => {
    const response = await updateFileName({ name: name, id: file.id });
    if (response.success) {
      toast.message('🗂 File renamed');
      setIsRename(false);
    } else {
      toast.error('Error renaming file');
    }
  };

  const handleDelete = async () => {
    const response = await removeFileByUser({ id: file.id });

    if (response.success) {
      toast.message('🗑 File deleted');
    } else {
      toast.error('Error deleting file');
    }
  };

  return (
    <tr
      className={`group relative cursor-pointer select-none hover:bg-gray-100 ${isSelected ? 'bg-gray-200' : ''}`}
      tabIndex={0}
      onClick={onSelect}
      onBlur={() => {
        setName(file.file_original_name);
      }}
    >
      <td className="w-10 py-1 pl-3 pr-1 text-center tabular-nums">
        <span className="text-gray-600">{index + 1}</span>
      </td>
      <td className="px-2 py-1">
        {!isRename ? (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            className="flex w-full max-w-[500px] cursor-pointer items-center truncate font-medium text-gray-800"
            onClick={() => setIsRename(true)}
          >
            {file.file_original_name}
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => setIsRename(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleRename();
              }
            }}
            className="w-full max-w-[500px] truncate border-none bg-transparent font-medium text-gray-800 outline-none"
            style={{
              height: '100%',
            }}
            autoFocus
          />
        )}
      </td>
      <td className="px-2 py-1 tabular-nums text-gray-600">{file.file_status}</td>
      <td className="px-2 py-1 tabular-nums text-gray-600">{formatFileSize(file.file_size)}</td>
      <td className="group cursor-pointer px-2 py-1">
        {file.file_status === FileStatus.COMPRESSED && (
          <div className="sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UploadButton
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-gray-600 hover:text-gray-800 focus:text-gray-950"
                >
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">File options</span>
                </UploadButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white text-gray-800">
                <DropdownMenuItem className="text-xs hover:bg-gray-100" onClick={handleDownload}>
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs hover:bg-gray-100" onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </td>
      {isSelected && <div className="pointer-events-none absolute inset-0 border border-blue-500" />}
    </tr>
  );
}

export function FileTable({ files }: { files: any[] }) {
  const router = useRouter();
  const [clientId] = useState<string>(uuid());
  const tableRef = useRef<HTMLTableElement>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  useEffect(() => {
    const api = `${BASE_URL}/file/sse/${clientId}`;
    const es = new EventSource(api);

    es.addEventListener('notification', e => {
      const [title, description] = e.data.split(',');
      toast.message(title, description);
      router.refresh();
    });

    es.onerror = _ => {
      toast.error('SSE connection error');
      es.close();
    };

    return () => {
      es.close();
    };
  }, []);

  return (
    <div className="w-full bg-white p-4 text-xs text-gray-800">
      <table ref={tableRef} className="w-full table-auto">
        <thead className="sticky top-0 border-b border-gray-300 bg-white">
          <tr className="text-left text-gray-600">
            <th className="w-10 py-1 pl-3 pr-1 font-medium">#</th>
            <th className="px-2 py-1 font-medium">File Name</th>
            <th className="px-2 py-1 font-medium">Status</th>
            <th className="px-2 py-1 font-medium">Size</th>
            <th className="w-8 px-2 py-1 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <FileRow
              key={file.id}
              file={file}
              index={index}
              isSelected={selectedFileId === file.id}
              onSelect={() => setSelectedFileId(file.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
