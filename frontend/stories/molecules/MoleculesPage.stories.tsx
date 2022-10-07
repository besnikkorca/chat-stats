import { ComponentMeta, ComponentStory } from '@storybook/react';
import MoleculesPage from './MoleculesPage';

export default {
  title: 'Atoms/MoleculesPage',
  component: MoleculesPage,
} as ComponentMeta<typeof MoleculesPage>;

const Template: ComponentStory<typeof MoleculesPage> = () => <MoleculesPage />;

export const Table = Template.bind({});
Table.args = {};
