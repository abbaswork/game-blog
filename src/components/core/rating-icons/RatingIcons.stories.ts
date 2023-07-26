import type { Meta, StoryObj } from '@storybook/react';

import { RatingIcons } from './RatingIcons';
import { RatingIconsTypes } from './types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RatingIcons> = {
  title: 'Core/RatingIcons',
  component: RatingIcons,
  argTypes: {
    rank: {
      control: {type: 'number', min: '1', max: '5'}
    }
  }
};

export default meta;
type Story = StoryObj<typeof RatingIcons>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Low: Story = {
  args: {
    rank: 0,
    label: true,
    icon: RatingIconsTypes.swords
  },
};
