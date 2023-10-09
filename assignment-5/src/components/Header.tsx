import React from 'react';
import Image from 'next/image';
import { Phudu } from 'next/font/google';

const phudu = Phudu({ subsets: ['vietnamese'], weight: '700' });

function Header() {
  return (
    <header>
      <nav id="menu-bar">
        <a href="/" className={`${phudu.className} text-3xl`}>
          Bookstore
        </a>
        <menu>
          <button id="menu-button" className="flex justify-center items-center">
            <Image
              width={30}
              height={30}
              className="rounded-full mr-2"
              src="https://i.pravatar.cc/30"
              alt="avatar-image"
            />
            <span>John Doe</span>
          </button>
        </menu>
      </nav>
    </header>
  );
}

export default Header;
