import type { Meta, StoryObj } from '@storybook/react';

import { NavLinks } from './NavLinks';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NavLinks> = {
  title: 'Core/NavLink',
  component: NavLinks,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavLinks>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};

