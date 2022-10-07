import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from 'atoms/Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    primary: { name: 'Is primary button' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  placeholder: 'Enter email',
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Enter password',
  type: 'password',
};
