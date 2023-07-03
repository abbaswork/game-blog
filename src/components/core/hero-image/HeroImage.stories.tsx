import type { Meta, StoryObj } from '@storybook/react';

import { HeroImage } from './HeroImage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HeroImage> = {
  title: 'Core/HeroImage',
  component: HeroImage,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof HeroImage>;

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