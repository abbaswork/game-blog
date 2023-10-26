import React from 'react';
import { icon } from './types';

interface Props {
  icon: icon;
}

//svgs created from boxIcons
const iconComponents = {
  [icon.medalGold]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "gold"}}><path d="M17 2h-4v4.059a8.946 8.946 0 0 1 4 1.459V2zm-6 0H7v5.518a8.946 8.946 0 0 1 4-1.459V2zm1 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm-1.225-8.519L12 11l1.225 2.481 2.738.397-1.981 1.932.468 2.727L12 17.25l-2.449 1.287.468-2.727-1.981-1.932 2.737-.397z"></path></svg>,
  [icon.medalSilver]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "silver"}}><path d="M17 2h-4v4.059a8.946 8.946 0 0 1 4 1.459V2zm-6 0H7v5.518a8.946 8.946 0 0 1 4-1.459V2zm1 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm-1.225-8.519L12 11l1.225 2.481 2.738.397-1.981 1.932.468 2.727L12 17.25l-2.449 1.287.468-2.727-1.981-1.932 2.737-.397z"></path></svg>,
  [icon.medalBronze]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "brown"}}><path d="M17 2h-4v4.059a8.946 8.946 0 0 1 4 1.459V2zm-6 0H7v5.518a8.946 8.946 0 0 1 4-1.459V2zm1 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm-1.225-8.519L12 11l1.225 2.481 2.738.397-1.981 1.932.468 2.727L12 17.25l-2.449 1.287.468-2.727-1.981-1.932 2.737-.397z"></path></svg>,
  [icon.bookmarks]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "gold"}}><path d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"></path></svg>

}

/**
 * Primary UI component for user interaction
 */
export const Icons = ({ icon }: Props) => {

  return (
    <>
      {iconComponents[icon]}
    </>
  );
};
