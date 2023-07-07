import type { Meta, StoryObj } from '@storybook/react';

import { BlogCard } from './BlogCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BlogCard> = {
  title: 'Core/BlogCard',
  component: BlogCard,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{
        width: "66%",
        maxWidth: "739px",
        padding: "2.5rem"
      }}>
        <Story />
      </div>
    )
  ]
};