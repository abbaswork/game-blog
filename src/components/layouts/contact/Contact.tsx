import React from 'react';
import './contact.scss';
import ContactButton from './../../../components/core/contact-button/ContactButton';
import { social } from "./../../../types/social";

interface Props {
  links?: {
    href: string,
    text: string
  }[]
}

export const Contact = ({ links }: Props) => {
  return (
    <div className='contact'>
      <p>Find us here:</p>
      <div className='links'>
        <ContactButton
          url={'https://www.youtube.com/channel/UCc5oH20jdMfxXKBBcc_OAcA'}
          type={social.youtube} />
        <ContactButton
          url={'https://www.instagram.com/metric.gamer.official?igsh=NjRlbnduaG1ud3p4'}
          type={social.instagram} />
        <ContactButton
          url={'https://www.tiktok.com/@metric.gamer.official'}
          type={social.tiktok} />
      </div>
      <div className='links'>
        {links && links.map((link, index) =>
          <a key={index} href={link.href}>{link.text}</a>
        )}
      </div>
    </div>
  );
};
