import React from 'react';
import { NavLinks } from '../core/nav-links/NavLinks';
import './header.scss';
import { Searchbar } from '../core/searchbar/Searchbar';
import LogoImg from "./../assets/logo-transparent.svg";
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => (
  <Link href="/">
    <Image className='logo' src={LogoImg} alt="logo" />
  </Link>
);

export const Header = () => (
  <header className="header-container nav-layout">
    {/* Renders 3 sections into the header */}
    <div className='nav-link-layout'>
      <NavLinks />
      <Logo />
    </div>

    <div>
      <Searchbar />
    </div>

  </header>
);
