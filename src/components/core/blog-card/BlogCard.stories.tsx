import type { Meta, StoryObj } from '@storybook/react';

import { BlogCard } from './BlogCard';
import { PageContent } from './../../layouts/page-content/PageContent';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BlogCard> = {
  title: 'Core/BlogCard',
  component: BlogCard
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
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