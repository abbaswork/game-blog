import type { Meta, StoryObj } from '@storybook/react';

import { NavLinks } from './NavLinks';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NavLinks> = {
  title: 'Core/NavLink',
  component: NavLinks
};

export default meta;
type Story = StoryObj<typeof NavLinks>;

// render empty decorators
export const Default: Story = {};

