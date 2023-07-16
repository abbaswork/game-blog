import React from 'react';

interface Props {
  children: any
}

export const Heading = ({ children }: Props) => {
  return (
    <h1 className='wp-title'>{children}</h1>
  );
};
