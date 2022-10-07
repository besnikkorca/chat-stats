import { ComponentMeta, ComponentStory } from '@storybook/react';
import Label from 'atoms/Label';

export default {
  title: 'Atoms/Label',
  component: Label,
  argTypes: {
    primary: { name: 'Is primary button' },
  },
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Main = Template.bind({});
Main.args = {
  children: 'Enter email',
};
