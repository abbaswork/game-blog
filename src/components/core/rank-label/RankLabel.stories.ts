import type { Meta, StoryObj } from '@storybook/react';

import { RankLabel } from './RankLabel';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RankLabel> = {
  title: 'Core/RankLabel',
  component: RankLabel
};

export default meta;
type Story = StoryObj<typeof RankLabel>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Low: Story = {
  args: {
    rank: 0
  },
};

export const Med: Story = {
  args: {
    rank: 6
  },
};

export const High: Story = {
  args: {
    rank: 9
  },
};


