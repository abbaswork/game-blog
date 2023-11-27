import type { Meta, StoryObj } from '@storybook/react';

import { ScrollUpButton } from './ScrollUpButton';
import { PageContent } from '../../layouts/page-content/PageContent';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ScrollUpButton> = {
  title: 'Core/ScrollUpButton',
  component: ScrollUpButton
};


export default meta;
type Story = StoryObj<typeof ScrollUpButton>;




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
