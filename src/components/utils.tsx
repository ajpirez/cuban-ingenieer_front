import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserAvatar } from '@/app/interfaces/user';

const isEmail = (word: string) => /\S+@\S+\.\S+/.test(word);
const isUrl = (word: string) => /^(https?:\/\/|www\.)[^\s]+$/.test(word);
const isTag = (word: string) => word.startsWith('#');
const isMention = (word: string) => word.startsWith('@');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function highlightWordsList(text: string, users: UserAvatar[]) {
  if (!text) {
    return text;
  }

  let emailCount = 0;
  let urlCount = 0;

  const parts = text.split(' ');

  return parts.map((part, i) => {
    const commonStyles =
      'inline-flex items-center gap-1 rounded-3xl font-bold py-1 px-2 break-words text-ellipsis w-fit mr-1';

    if (isEmail(part)) {
      return (
        <span key={i} className={`${commonStyles} bg-orangeLetterLight text-orangeLetterDark`}>
          <img src="/mail.svg" alt="Mail" className="mr-1 h-4 w-4" style={{ verticalAlign: 'middle' }} />
          <span className="leading-none">{`Email ${++emailCount}`}</span>
        </span>
      );
    }

    if (isUrl(part)) {
      return (
        <span key={i} className={`${commonStyles} bg-blueLetterLight text-blueLetterDark`}>
          <img src="/link.svg" alt="Link" className="h-4 w-4" style={{ verticalAlign: 'middle' }} />
          <span className="leading-none">{`Link ${++urlCount}`}</span>
        </span>
      );
    }

    if (isTag(part)) {
      return (
        <span key={i} className={`${commonStyles} h-6 w-4 bg-purpleLetterLight text-purpleLetterDark`}>
          {part}
        </span>
      );
    }

    if (isMention(part)) {
      const user = users.find(user => user.email === part.split('@')[1]);

      return (
        <span key={i} className={`${commonStyles} h-6 w-4 bg-greenLetterLight text-greenLetterDark`}>
          <img src={user?.avatar} alt="Link" className="h-4 w-4" style={{ verticalAlign: 'middle' }} />
          {user?.name}
        </span>
      );
    }

    return (
      <span key={i} className="break-words">
        {part}{' '}
      </span>
    );
  });
}

export function checkPositiveInteger(str: string, min?: number, max?: number, defaultValue: string = '1'): string {
  const num = parseInt(str, 10);

  if (!isNaN(num) && num > 0 && Number.isInteger(num)) {
    if ((min !== undefined && num < min) || (max !== undefined && num > max)) {
      return defaultValue;
    }
    return str;
  }
  return defaultValue;
}

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export const formatFileSize = (sizeInBytes: number) => {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};
