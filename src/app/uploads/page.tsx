import React from 'react';
import { CoverImage } from '@/components/uploads/cover-image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { FileTable } from '@/components/uploads/file-table';
import { checkPositiveInteger } from '@/components/utils';
import HandleSignOut from '@/components/ui/HandleSignOut';
import { listFileByUser } from '@/actions/listFileByUser';

interface Props {
  searchParams: {
    page?: string;
  };
}

const UploadsPage = async ({ searchParams }: Props) => {
  const page = searchParams?.page;

  const files = await listFileByUser({
    page: +checkPositiveInteger(page || '1', 1, 1000000, '1'),
    limit: +checkPositiveInteger(page || '10', 10, 10, '10'),
  });

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#0A0A0A] pb-[69px]">
      <HandleSignOut status={files?.status ?? 200} />
      <div className="flex items-center space-x-3 bg-[#0A0A0A] px-4 py-3">
        <CoverImage />
      </div>
      <ScrollArea className="mt-3 flex-1">
        <div className="min-w-max">
          <FileTable files={files?.data?.elements || []} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default UploadsPage;
