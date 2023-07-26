import type { Meta, StoryObj } from '@storybook/react';

import { GameTag } from './GameTag';
import { PageContent } from './../../layouts/page-content/PageContent';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof GameTag> = {
  title: 'Core/GameTag',
  component: GameTag
};

export default meta;
type Story = StoryObj<typeof GameTag>;


export const Default: Story = {
  args: {
    children: "Test"
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