import type { Meta, StoryObj } from '@storybook/react';
import { RatingIcons } from './RatingIcons';
import { RatingIconsTypes } from './types';
import { PageContent } from './../../layouts/page-content/PageContent';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RatingIcons> = {
  title: 'Core/RatingIcons',
  component: RatingIcons,
  argTypes: {
    rank: {
      control: { type: 'number', min: '1', max: '5' },
    },
    icon: {
      options: RatingIconsTypes,
      control: { type: 'select' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof RatingIcons>;

export const Default: Story = {
  args: {
    rank: 5,
    label: true,
    icon: RatingIconsTypes.swords
  },
  decorators: [
    (Story) => (
      <div className='flex-center'>
        <PageContent>
          <Story/>
        </PageContent>
      </div>
    )
  ],
};
