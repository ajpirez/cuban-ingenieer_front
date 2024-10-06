'use client';

import React, { useState, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/uploads/button';
import { downloadFile } from '@/actions/downloadFile';

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
  const [isFocused, setIsFocused] = useState(false);

  const handleDownload = async () => {
    const res = await downloadFile({ id: file.id });

    if (res?.success && res.blob) {
      const url = URL.createObjectURL(res.blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.compressed_file_path);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      console.error('Error al descargar el archivo:', res.message);
    }
  };

  return (
    <tr
      className={`group relative cursor-pointer select-none hover:bg-[#1A1A1A] ${isSelected ? 'bg-[#1A1A1A]' : ''}`}
      tabIndex={0}
      onClick={onSelect}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <td className="w-10 py-[2px] pl-3 pr-2 text-center tabular-nums">
        <span className="text-gray-400">{index + 1}</span>
      </td>
      <td className="px-2 py-[2px]">
        <div className="flex items-center">
          <div className="max-w-[180px] truncate font-medium text-[#d1d5db] sm:max-w-[200px]">{file.file_name}</div>
        </div>
      </td>
      <td className="px-2 py-[2px] tabular-nums text-[#d1d5db]">{file.file_size}</td>
      <td className="px-2 py-[2px]">
        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-400 hover:text-white focus:text-white">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">File options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 text-white">
              <DropdownMenuItem className="text-xs hover:bg-gray-400" onClick={handleDownload}>
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs hover:bg-gray-400">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
      {isSelected && <div className="pointer-events-none absolute inset-0 border border-[#1e3a8a]" />}
    </tr>
  );
}

export function FileTable({ files }: { files: any[] }) {
  const tableRef = useRef<HTMLTableElement>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  return (
    <table ref={tableRef} className="w-full text-xs">
      <thead className="sticky top-0 z-10 border-b border-[#282828] bg-[#0A0A0A]">
        <tr className="text-left text-gray-400">
          <th className="w-10 py-2 pl-3 pr-2 font-medium">#</th>
          <th className="px-2 py-2 font-medium">File Name</th>
          <th className="px-2 py-2 font-medium">Size</th>
          <th className="w-8 px-2 py-2 font-medium"></th>
        </tr>
      </thead>
      <tbody className="mt-[1px]">
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
  );
}
