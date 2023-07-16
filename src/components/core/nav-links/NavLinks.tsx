'use client';

import React from 'react';
import './nav-links.scss';
import { useRef } from "react"
import { useOutsideRefClick } from './../../util/util';

//client component given the link behaviour

export const NavLinks = () => {

  //button that opens mobile overlay
  const [showMobileOverlay, setshowMobileOverlay] = React.useState<boolean>(false);

  //set ref, pass handler for setting the dropdown when clicked outside of the ref
  const overlayRef = useRef(null);
  
  useOutsideRefClick(overlayRef, () => setshowMobileOverlay(false));

  return (
    <div className={(showMobileOverlay ? " mobile-overlay" : "")}>
      {/* Container that determines how it's children styles change in the mobile overlay ^ */}

      {/* Button that opens overlay */}
      <div className='mobile-bars' onClick={() => setshowMobileOverlay(!showMobileOverlay)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>

      {/* container that renders links as inline or in an overlay based on device */}
      <div className='navlink-container' ref={overlayRef}>
        <div className='mobile-links'>
          <a>Link 1</a>
          <a>Link 2</a>
          <a>Link 3</a>
        </div>
      </div>
    </div>
  );
};
