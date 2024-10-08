import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="mb-10 flex w-full justify-center text-xs">
      <Link href="/">
        <span className={'font-bold antialiased'}>Cuban </span>
        <span>| Ingenieer </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="mx-3">
        Privacidad & Legal
      </Link>

      <Link href="/" className="mx-3">
        +53 5 3914669 contact@cuban.engineer https://odoo.cuban.engineer
      </Link>
    </div>
  );
};
