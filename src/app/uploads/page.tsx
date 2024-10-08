import React from 'react';
import { CoverImage } from '@/components/uploads/cover-image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { FileTable } from '@/components/uploads/file-table';
import { checkPositiveInteger } from '@/components/utils';
import HandleSignOut from '@/components/ui/HandleSignOut';
import { listFileByUser } from '@/actions/listFileByUser';
import { Pagination } from '@/components/ui/Pagination';

interface Props {
  searchParams: {
    page?: string;
  };
}

const UploadsPage = async ({ searchParams:{page} }: Props) => {

  const files = await listFileByUser({
    page: +checkPositiveInteger(page || '1', 1, 1000000, '1'),
    limit: +checkPositiveInteger(page || '10', 10, 10, '10'),
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      <ScrollArea className="mt-3 flex-1">
        <HandleSignOut status={files?.status ?? 200} />
        <div className="flex items-center space-x-3 bg-white px-4 py-3">
          <CoverImage />
        </div>
        <div className="min-w-max">
          <FileTable files={files?.data?.elements || []} />
          {files?.data?.elements?.length > 0 && (
            <Pagination totalPages={Math.ceil(files?.data?.pagination?.lastPage ?? 0)} />
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default UploadsPage;
