import React from 'react';
import { Header } from './../../header/Header';
import { PageContent } from '../page-content/PageContent';
import { SidePanel } from '../side-panel/SidePanel';
import { ListContainer } from './../../core/list-container/ListContainer';
import { HeroImage } from './../../core/hero-image/HeroImage';
import { Heading } from './../../typography/heading/Heading';
import { SubHeading } from './../../typography/sub-heading/SubHeading';
import { ScrollBackButton } from './../../core/scroll-up-button/ScrollUpButton';

export const Page: React.FC = () => {

  return (
    <>
      <Header />
      <div className='page-layout'>
        {/* Render Basic Blog Content*/}
        <PageContent>
          <HeroImage src="https://cdn2.whatoplay.com/news/an-everyday-story-demo.webp" alt="test" />
          <Heading> Title </Heading>

          <SubHeading>Introduction </SubHeading>
          <p>Blog Introduction</p>

          <ListContainer title='Table of Contents'>
            <>
              <li><a>Section 1</a></li>
              <li><a>Section 1</a></li>
              <li><a>Section 1</a></li>
            </>
          </ListContainer>

          <SubHeading>Heading 1 </SubHeading>
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
        <ScrollBackButton/>
      </div>
    </>
  );
};
