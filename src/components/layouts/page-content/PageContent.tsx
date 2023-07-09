import React, { Children } from 'react';
import './page-content.scss';


interface Props {
  children?: any;
}

export const PageContent = ({ children }: Props) => {
  return (
    // Consider using section + article tags
    <div className='page-content'>
      {children}
    </div>
  );
};
