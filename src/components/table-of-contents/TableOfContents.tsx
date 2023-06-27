import React from 'react';
import './table-of-contents.scss';

/**
 * Primary UI component for user interaction
 */
export const TableOfContents = () => {
  return (
    <div className='table-of-contents'>
      <h2>Table Of Contents</h2>
      <ul className='table-of-contents-list'>
        <li><a>Section 1</a></li>
        <li><a>Section 1</a></li>
        <li><a>Section 1</a></li>
      </ul>
    </div>
  );
};
