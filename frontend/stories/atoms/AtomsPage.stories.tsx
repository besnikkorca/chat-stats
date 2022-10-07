import { ComponentMeta, ComponentStory } from '@storybook/react';
import AtomsPage from './AtomsPage';

export default {
  title: 'Atoms/AtomsPage',
  component: AtomsPage,
} as ComponentMeta<typeof AtomsPage>;

const Template: ComponentStory<typeof AtomsPage> = () => <AtomsPage />;

export const Table = Template.bind({});
Table.args = {};
