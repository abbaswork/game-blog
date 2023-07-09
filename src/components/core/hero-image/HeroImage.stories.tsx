import type { Meta, StoryObj } from '@storybook/react';
import { PageContent } from './../../layouts/page-content/PageContent';
import { HeroImage } from './HeroImage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HeroImage> = {
  title: 'Core/HeroImage',
  component: HeroImage
};

export default meta;
type Story = StoryObj<typeof HeroImage>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className='flex-center'>
        <PageContent>
          <Story />
        </PageContent>
      </div>
    )
  ],
};