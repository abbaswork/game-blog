'use client';
import React from 'react';
import "./share-button.scss";
import { shareButtons } from './types';
import { shareIcons } from './icons';

type ShareButtonProps = {
  url: string,
  title: string,
  type: shareButtons
}

const ShareButton = ({ url, title, type }: ShareButtonProps) => {

  //generate share url based on social media type
  const handleShareURL = () => {
    switch (type) {
      case shareButtons.facebook:
        return `https://www.facebook.com/sharer.php?u=${url}&quote=${title}`;
      case shareButtons.twitter:
        return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      case shareButtons.pinterest:
        return `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
      default: "";
    }
  }

  //generate post in new window
  const handleShareClick = async () => {
    if (type === shareButtons.link)
      await navigator.clipboard.writeText(url)

    else {
      const shareWindow = window.open(handleShareURL(), '', 'width=600,height=400');
      if (shareWindow) {
        shareWindow.focus();
      }
    }
  };

  return (
    <button
      className="share-button"
      onClick={handleShareClick}
    >
      {shareIcons[type]}
    </button>
  );
};

export default ShareButton;
