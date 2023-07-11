import React from 'react';
import './list-container.scss';

interface Props {
  title: string
  children?: any
}

export const ListContainer = ({ title, children }: Props) => {
  return (
    <div className='list-container'>
      <h2>{title}</h2>
      <ul className='default-list'>
        {children}
      </ul>
    </div>
  );
};
