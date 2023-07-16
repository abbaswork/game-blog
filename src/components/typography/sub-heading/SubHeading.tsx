import React from 'react';

interface Props {
  children: any
}

export const SubHeading = ({children}: Props) => {
  return (
    <h2 className='wp-block-heading'> {children} </h2>
  );
};
