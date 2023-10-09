import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold my-6">404 - There was a problem!</h1>
      <p>We could not find the page your were looking for.</p>
      <p>
        Back to{' '}
        <Link className="text-blue-700" href="/">
          Home
        </Link>
        .
      </p>
    </div>
  );
}
