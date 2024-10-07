'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/uploads/button';
import { downloadFile } from '@/actions/downloadFile';
import { formatFileSize } from '@/components/utils';
import { FileStatus } from '@/app/interfaces/file';
import { useRouter } from 'next/navigation';
import { updateFileName } from '@/actions/updateFileName';

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
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
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
      const link = document.createElement('a');
      link.href = `data:${response.mimeType};base64,${response.base64}`;
      link.download = response.filename || 'downloaded-file.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log('Error downloading file:', response.message);
    }
  };

  const handleRename = () => {
    updateFileName({ name: name, id: file.id }).then(() => {});
    setIsRename(false);
  };

  return (
    <tr
      className={`group relative cursor-pointer select-none hover:bg-gray-100 ${isSelected ? 'bg-gray-200' : ''}`}
      tabIndex={0}
      onClick={onSelect}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setName(file.file_original_name);
        setIsFocused(false);
      }}
    >
      <td className="w-10 py-1 pl-3 pr-1 text-center tabular-nums">
        <span className="text-gray-600">{index + 1}</span>
      </td>
      <td className="px-2 py-1">
        {!isRename ? (
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
      <td className="px-2 py-1">
        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-600 hover:text-gray-800 focus:text-gray-800">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">File options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 text-gray-800 bg-white">
              {file.file_status === FileStatus.COMPRESSED && (
                <DropdownMenuItem className="text-xs hover:bg-gray-100" onClick={handleDownload}>
                  Download
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-xs hover:bg-gray-100">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
      {isSelected && <div className="pointer-events-none absolute inset-0 border border-blue-500" />}
    </tr>
  );
}

export function FileTable({ files }: { files: any[] }) {
  const tableRef = useRef<HTMLTableElement>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  return (
    <div className="w-full bg-white p-4 text-xs text-gray-800">
      <table ref={tableRef} className="w-full table-auto">
        <thead className="sticky top-0 z-10 border-b border-gray-300 bg-white">
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
