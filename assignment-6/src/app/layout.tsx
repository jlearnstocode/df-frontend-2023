import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header';
import { BookProvider } from '../context/BookContext';
import { AuthProvider } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookStore',
  description: 'This is the BookStore description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-black text-base font-normal`}>
        <AuthProvider>
          <BookProvider>
            <main className="flex min-h-screen flex-col items-center justify-start mt-14 py-8 px-4 bg-gray-100">
              <Header />
              {children}
            </main>
            <ToastContainer />
          </BookProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
