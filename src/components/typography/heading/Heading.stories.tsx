import type { Meta, StoryObj } from '@storybook/react';
import { PageContent } from '../../layouts/page-content/PageContent';
import { Heading } from './Heading';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading
};

export default meta;
type Story = StoryObj<typeof Heading>;

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