import React from 'react';
import './page.scss';
import { Header } from './../../header/Header';
import { PageContent } from '../page-content/PageContent';

export const Page: React.FC = () => {

  return (
    <>
      <Header />
      <div className='page-layout'>
        {/* Consider using section + article tags */}
        <PageContent />
      </div>
    </>
  );
};
