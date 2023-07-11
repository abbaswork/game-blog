import type { Meta, StoryObj } from '@storybook/react';
import { PageContent } from '../../layouts/page-content/PageContent';
import { ListContainer } from './ListContainer';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ListContainer> = {
  title: 'Core/ListContainer',
  component: ListContainer
};

export default meta;
type Story = StoryObj<typeof ListContainer>;

export const TableOfContents: Story = {
  args: {
    title: 'Table of Contents',
    children: (
      <>
        <li><a>Section 1</a></li>
        <li><a>Section 1</a></li>
        <li><a>Section 1</a></li>
      </>
    )
  },
  decorators: [
    (Story) => (
      <div className='flex-center'>
        <PageContent>
          <Story />
        </PageContent>
      </div>
    )
  ],
};

export const Sidebar: Story = {
  args: {
    title: 'Sidebar',
    children: (
      <>
        <li>New Blogs Coming Soon</li>
      </>
    )
  },
  decorators: [
    (Story) => (
      <div className='flex-center'>
        <PageContent>
          <Story />
        </PageContent>
      </div>
    )
  ],
};