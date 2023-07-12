import React from 'react';
import './sub-heading.scss';

interface Props {
  children: any
}

export const SubHeading = ({children}: Props) => {
  return (
    <h2 className='sub-heading'> {children} </h2>
  );
};
