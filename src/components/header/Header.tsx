import React from 'react';
import { NavLinks } from '../core/nav-links/NavLinks';
import './header.scss';
import { Searchbar } from '../core/searchbar/Searchbar';
import LogoImg from "./../assets/logo-transparent.svg";
import Image from 'next/image';
import Link from 'next/link';
import { menuItem, menuLinkProps } from '@/services/navigation/types';

const Logo = () => (
  <Link href="/">
    <Image className='logo' src={LogoImg} alt="logo" />
  </Link>
);

type HeaderProps = {
  menuItems: menuLinkProps[]
}

export const Header = ({ menuItems }: HeaderProps) => (
  <header className="header-container nav-layout">
    {/* Renders 3 sections into the header */}
    <div className='nav-link-layout'>
      <NavLinks menuItems={menuItems} />
      <Logo />
    </div>

    <Searchbar />

  </header>
);
