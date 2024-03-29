import type { Meta, StoryObj } from '@storybook/react';

import { Searchbar } from './Searchbar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Searchbar> = {
  title: 'Core/Searchbar',
  component: Searchbar
};

export default meta;
type Story = StoryObj<typeof Searchbar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};