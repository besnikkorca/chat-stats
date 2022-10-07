import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from 'atoms/Button';
import { ButtonSize } from 'atoms/Button/constants';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    primary: { name: 'Is primary button' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  size: ButtonSize.large,
  text: 'deal',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  size: ButtonSize.normal,
  text: 'reset',
};
