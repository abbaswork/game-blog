'use client';
import React from 'react';
import "./share-button.scss";
import { social } from './../../../types/social';
import { socialIcons } from './../../../assets/social';

type ShareButtonProps = {
  url: string,
  title: string,
  type: social
}

const ShareButton = ({ url, title, type }: ShareButtonProps) => {

  //generate share url based on social media type
  const handleShareURL = () => {
    switch (type) {
      case social.facebook:
        return `https://www.facebook.com/sharer.php?u=${url}&quote=${title}`;
      case social.twitter:
        return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      case social.pinterest:
        return `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
      default: "";
    }
  }

  //generate post in new window
  const handleShareClick = async () => {
    if (type === social.link)
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
      {socialIcons[type]}
    </button>
  );
};

export default ShareButton;
