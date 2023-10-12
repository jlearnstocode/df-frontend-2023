'use client';

import React from 'react';
import Image from 'next/image';
import { Phudu } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useAuth, useAuthState } from '../context/AuthContext';
import Button from './Button';

const phudu = Phudu({ subsets: ['vietnamese'], weight: '700' });

function Header() {
  const { userInfo, isLogin } = useAuthState();
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <header>
      <nav id="menu-bar">
        <a href="/" className={`${phudu.className} text-3xl`}>
          Bookstore
        </a>
        <menu>
          <div id="menu-button" className="flex justify-center items-center">
            {isLogin ? (
              <>
                <Image
                  width={30}
                  height={30}
                  className="rounded-full mr-2"
                  src="https://i.pravatar.cc/30"
                  alt="avatar-image"
                />
                <span className="mr-4">Hello, {userInfo?.fullName}</span>
                <Button
                  text="Log out"
                  variant="logout-button"
                  onClick={() => {
                    try {
                      logout();
                      router.push(`/login`);
                    } catch (error) {
                      console.log('error', error);
                    }
                  }}
                />
              </>
            ) : (
              'Hello, guest!'
            )}
          </div>
        </menu>
      </nav>
    </header>
  );
}

export default Header;
