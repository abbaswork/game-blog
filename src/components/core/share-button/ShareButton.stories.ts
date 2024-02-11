import type { Meta, StoryObj } from '@storybook/react';
import ShareButton from './ShareButton';
import { social } from './../../../types/social';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ShareButton> = {
  title: 'Core/ShareButton',
  component: ShareButton
};

export default meta;
type Story = StoryObj<typeof ShareButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    url: "http://metricgamer.com/",
    title: "Test Share",
    type: social.facebook
  },
};