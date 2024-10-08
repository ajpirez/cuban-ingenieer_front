import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="mb-10 mt-auto flex w-full flex-col items-center justify-center text-xs md:flex-row">
      <Link href="/">
        <span className={'font-bold antialiased'}>Cuban </span>
        <span>| Ingenieer </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="mx-3">
        Privacidad & Legal
      </Link>

      <p className="text-center mx-3 text-wrap">+53 5 3914669 contact@cuban.engineer https://odoo.cuban.engineer</p>
    </div>
  );
};
