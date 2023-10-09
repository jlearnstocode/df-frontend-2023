import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold my-6">Oops!… I Did It Again</h1>
      <p>We could not find this book.</p>
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
