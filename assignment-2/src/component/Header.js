import React from 'react'

function Header() {
  return (
    <header>
      <nav id="menu-bar">
        <a href="/" className="logo-text">
          Bookstore
        </a>
        <menu>
          <button id="menu-button">
            <img
              className="fit-picture"
              src="https://i.pravatar.cc/30"
              alt="Grapefruit slice atop a pile of other slices"
            />
            <span>John Doe</span>
          </button>
        </menu>
      </nav>
    </header>
  );
}

export default Header