import { ComponentMeta, ComponentStory } from '@storybook/react';
import FormInput from 'molecules/FormInput';

export default {
  title: 'Atoms/FormInput',
  component: FormInput,
  argTypes: {
    primary: { name: 'Is primary button' },
  },
} as ComponentMeta<typeof FormInput>;

const Template: ComponentStory<typeof FormInput> = (args) => <FormInput {...args} />;

export const Main = Template.bind({});
Main.args = {
  label: 'Enter email',
  value: 'besnik.korca1@gmail.com',
};
