import type { Meta, StoryObj } from '@storybook/react';

import { PageContent } from './PageContent';

const meta: Meta<typeof PageContent> = {
  title: 'Layouts/PageContent',
  component: PageContent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PageContent>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className='flex-center'>
        <Story />
      </div>
    )
  ]
};
