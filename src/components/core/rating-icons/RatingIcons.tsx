import React from 'react';
import './rating-icons.scss';
import { RatingIconsTypes, rIcons } from './types';

interface Props {
  rank: number;
  label?: boolean;
  icon: RatingIconsTypes
}

/**
 * Primary UI component for user interaction
 */
export const RatingIcons = ({ rank, label = false, icon }: Props) => {

  const mapIcons = () => {
    var iconArray: JSX.Element[] = [];

    for(var i = 0; i <= rank - 1; i++){
      iconArray.push(rIcons[icon]);
    }

    return iconArray;
  }

  return (
    <div className='rating-icon-container'>
      {/* {label && rank} */}
      {/* <div className={"rating-icon-bar"}> */}
       {mapIcons()}
      {/* </div> */}
      {label && "/5"}
    </div>
  );
};
