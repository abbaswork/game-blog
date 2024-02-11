import type { Meta, StoryObj } from '@storybook/react';

import { Contact } from './Contact';

const meta: Meta<typeof Contact> = {
  title: 'Layouts/Contact',
  component: Contact,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Contact>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className='flex-center'>
        <Story />
      </div>
    )
  ]
};
