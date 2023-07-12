import type { Meta, StoryObj } from '@storybook/react';
import { PageContent } from '../../layouts/page-content/PageContent';
import { SubHeading } from './SubHeading';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SubHeading> = {
  title: 'Typography/SubHeading',
  component: SubHeading
};

export default meta;
type Story = StoryObj<typeof SubHeading>;

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