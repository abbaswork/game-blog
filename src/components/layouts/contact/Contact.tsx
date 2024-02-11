import React from 'react';
import './contact.scss';
import ContactButton from './../../../components/core/contact-button/ContactButton';
import { social } from "./../../../types/social";

interface Props { }

export const Contact = ({ }: Props) => {
  return (
    <div className='contact'>
      <p>Find us here:</p>
      <div className='icon-row'>
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
      <a href='https://docs.google.com/forms/d/e/1FAIpQLSdJDfikXnTCbU2XkvhYk7EBeikD1Ws-hBLFFOWBf8GleNoq5w/viewform?usp=sf_link'>Get in touch</a>
    </div>
  );
};
