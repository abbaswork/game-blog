import type { Meta, StoryObj } from '@storybook/react';

import { TableOfContents } from './TableOfContents';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TableOfContents> = {
  title: 'Components/TableOfContents',
  component: TableOfContents
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};