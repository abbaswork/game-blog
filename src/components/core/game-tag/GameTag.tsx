import React from 'react';
import './game-tag.scss';

interface Props {
  children: React.ReactNode
}

/**
 * Primary UI component for user interaction
 */
export const GameTag = ({ children }: Props) => {
  return (
    <div className="game-tag">
      {children}
    </div>
  );
};
