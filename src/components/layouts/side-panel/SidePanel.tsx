import React, { Children } from 'react';
import './side-panel.scss';


interface Props {
  children?: any;
}

export const SidePanel = ({ children }: Props) => {
  return (
    // Consider using section + article tags
    <div className='side-panel'>
      {children}
    </div>
  );
};
