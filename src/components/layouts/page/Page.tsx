import React from 'react';
import './page.scss';
import { Header } from './../../header/Header';
import { PageContent } from '../page-content/PageContent';
import { SidePanel } from '../side-panel/SidePanel';
import { ListContainer } from './../../core/list-container/ListContainer';
import { HeroImage } from './../../core/hero-image/HeroImage';

export const Page: React.FC = () => {

  return (
    <>
      <Header />
      <div className='page-layout'>
        {/* Render Basic Blog Content*/}
        <PageContent>
          <HeroImage />
          <h1>Page Title</h1>
          <p>Blog Introduction</p>
          <ListContainer title='Table of Contents'>
            <>
              <li><a>Section 1</a></li>
              <li><a>Section 1</a></li>
              <li><a>Section 1</a></li>
            </>
          </ListContainer>
          <h2>Subheading</h2>
          <p>Blog Content</p>
        </PageContent>

        {/* Render Sidebar in sidepanel */}
        <SidePanel>
          <ListContainer title='Sidebar'>
            <>
              <li>New Blogs Coming Soon</li>
            </>
          </ListContainer>
        </SidePanel>
      </div>
    </>
  );
};
