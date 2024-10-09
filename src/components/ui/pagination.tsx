'use client';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { generatePaginationNumbers } from '@/components/utils';

interface Props {
  totalPages: number;
}

export const PaginationURL = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;

  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathName);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === '...') {
      return `${pathName}/?${params.toString}`;
    }
    if (+pageNumber <= 0) {
      return `${pathName}`;
    }
    if (+pageNumber > totalPages) {
      return `${pathName}/?${params.toString()}`;
    }
    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="mb-16 mt-6 flex justify-center text-center">
      <nav aria-label="Page navigation">
        <ul className="flex list-none space-x-1">
          <li>
            <Link
              href={createPageUrl(currentPage - 1)}
              className="block rounded-full bg-gray-200 px-2 py-1.5 text-gray-600 transition-all duration-300 hover:bg-gray-300 hover:text-gray-800"
            >
              <IoChevronBackOutline size={20} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={page + '_' + index}>
              <Link
                href={createPageUrl(page)}
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300',
                  {
                    'bg-blue-600 text-white': page === currentPage,
                    'bg-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white': page !== currentPage,
                  },
                )}
              >
                {page}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={createPageUrl(currentPage + 1)}
              className="block rounded-full bg-gray-200 px-2 py-1.5 text-gray-600 transition-all duration-300 hover:bg-gray-300 hover:text-gray-800"
            >
              <IoChevronForwardOutline size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
