import type { Meta, StoryObj } from '@storybook/react';
import ContactButton from './ContactButton';
import { social } from './../../..//types/social';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ContactButton> = {
  title: 'Core/ContactButton',
  component: ContactButton
};

export default meta;
type Story = StoryObj<typeof ContactButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    url: "http://metricgamer.com/",
    type: social.facebook
  },
};