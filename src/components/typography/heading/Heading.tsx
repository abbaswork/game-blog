import React from 'react';
import './heading.scss';

interface Props {
  children: any
}

export const Heading = ({ children }: Props) => {
  return (
    <h1 className='heading'>{children}</h1>
  );
};
