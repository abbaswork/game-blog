import React from 'react';
import { NavLinks } from '../core/nav-links/NavLinks';
import './header.scss';
import { Searchbar } from '../core/searchbar/Searchbar';

const Logo = () => (
  <div style={{
    width:  "1.5rem",
    height: "1.5rem",
    backgroundColor: "#f6ca56"
  }}/>
);

export const Header = () => (
  <header className="header-container nav-layout">
    {/* Renders 3 sections into the header */}
    <div className='nav-link-layout'>
      <NavLinks />
      <Logo />
    </div>

    <div>
     <Searchbar/>
    </div>

  </header>
);
