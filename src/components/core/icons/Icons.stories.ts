import type { Meta, StoryObj } from '@storybook/react';

import { Icons } from './Icon';
import { icon } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Icons> = {
  title: 'Core/Icons',
  component: Icons,
  argTypes: {
    icon: {
      control: 'select', options: icon
    }
  }
};

export default meta;
type Story = StoryObj<typeof Icons>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Medal: Story = {
  args: {
    icon: icon.medalGold
  },
};
