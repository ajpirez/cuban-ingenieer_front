import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

const isEmail = (word: string) => /\S+@\S+\.\S+/.test(word);
const isUrl = (word: string) => /^(https?:\/\/|www\.)[^\s]+$/.test(word);
const isTag = (word: string) => word.startsWith('#');
const isMention = (word: string) => word.startsWith('@');

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function highlightWordsList(text: string) {
  if (!text) return text;

  const parts = text.split(" ");

  return parts.map((part, i) => {
    const commonStyles =
      "inline-flex items-center gap-1 rounded-3xl font-bold py-1 px-2 break-words text-ellipsis w-fit";

    if (isEmail(part)) {
      return (
        <span
          key={i}
          className={`${commonStyles} text-orangeLetterDark bg-orangeLetterLight`}
        >
          <img
            src="/mail.svg"
            alt="Mail"
            className="w-4 h-4 mr-1"
            style={{ verticalAlign: "middle" }}
          />
          <span className="leading-none">{part}</span>
        </span>
      );
    }

    if (isUrl(part)) {
      return (
        <span
          key={i}
          className={`${commonStyles} text-blueLetterDark bg-blueLetterLight`}
        >
          <img
            src="/link.svg"
            alt="Link"
            className="w-4 h-4 mr-1"
            style={{ verticalAlign: "middle" }}
          />
          <span className="leading-none">{part}</span>
        </span>
      );
    }

    if (isTag(part)) {
      return (
        <span
          key={i}
          className={`${commonStyles} text-purpleLetterDark bg-purpleLetterLight`}
        >
          {part}
        </span>
      );
    }

    if (isMention(part)) {
      return (
        <span
          key={i}
          className={`${commonStyles} text-greenLetterDark bg-greenLetterLight`}
        >
          {part}
        </span>
      );
    }

    return (
      <span key={i} className="break-words">
        {part}{" "}
      </span>
    );
  });
}

export const highlightWordsColor = (input: string) => {
    const parts = input.split(' ');

    return parts.map((part, i) => {
        if (isEmail(part)) return <span key={i}
                                        className="text-orangeLetter font-semibold">{part} </span>;
        if (isUrl(part)) return <span key={i}
                                      className="text-blueLetter font-semibold">{part} </span>;
        if (isTag(part)) return <span key={i}
                                      className="text-purpleLetter font-semibold">{part} </span>;
        if (isMention(part)) return <span key={i}
                                          className="text-greenLetter font-semibold">{part} </span>;
        return <span key={i}>{part} </span>;
    });
}

export function checkPositiveInteger(str: string, min?: number, max?: number, defaultValue: string = '1'): string {
  // Try to convert the string to an integer
  const num = parseInt(str, 10);

  // Check if the conversion is valid, if the number is greater than zero,
  // and if it is within the optional min and max range
  if (!isNaN(num) && num > 0 && Number.isInteger(num)) {
    if ((min !== undefined && num < min) || (max !== undefined && num > max)) {
      return defaultValue;
    }
    return str;
  }
  return defaultValue;
}