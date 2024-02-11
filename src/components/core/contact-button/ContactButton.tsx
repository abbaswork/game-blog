'use client';
import React from 'react';
import "./contact-button.scss";
import { social } from './../../../types/social';
import { socialIcons } from './../../../assets/social';

type ContactButtonProps = {
  url: string,
  type: social
}

const ContactButton = ({ url, type }: ContactButtonProps) => {
  return (
    <a
      className="contact-button"
      href={url}
    >
      {socialIcons[type]}
    </a>
  );
};

export default ContactButton;
