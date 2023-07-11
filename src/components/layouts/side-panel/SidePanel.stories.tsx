import type { Meta, StoryObj } from '@storybook/react';

import { SidePanel } from './SidePanel';

const meta: Meta<typeof SidePanel> = {
  title: 'Layouts/SidePanel',
  component: SidePanel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className='flex-center'>
        <Story />
      </div>
    )
  ]
};
