import React from 'react';
import './list-container.scss';

interface Props {
  title: string
  children?: any
  className?: string
}

export const ListContainer = ({ title, children, className = "" }: Props) => {
  return (
    <div className={'list-container ' + className}>
      <h2>{title}</h2>
      <ul className='default-list'>
        {children}
      </ul>
    </div>
  );
};
