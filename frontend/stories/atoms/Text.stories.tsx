import { ComponentMeta, ComponentStory } from '@storybook/react';
import Text from 'atoms/Text';
import { TextColor, TextSize } from 'atoms/Text/constants';

export default {
  title: 'Atoms/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = ({ color, ...args }) => {
  if (color && color !== TextColor.primary) {
    return <Text {...args} color={color} />;
  }

  // for white text we're just rendering a background so that it's visible
  return (
    <div className="bg-gray-300 w-full h-full">
      <Text {...args} color={color} />
    </div>
  );
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  text: 'Officia deserunt anim sint magna culpa.',
  size: TextSize.xlarge,
  color: TextColor.secondary,
};

export const Large = Template.bind({});
Large.args = {
  text: 'Non do deserunt deserunt nulla veniam incididunt ad fugiat in adipisicing dolore.',
  size: TextSize.large,
  color: TextColor.primary,
};

export const Medium = Template.bind({});
Medium.args = {
  text: 'Consectetur elit veniam nulla tempor enim exercitation occaecat commodo ea occaecat tempor.',
  size: TextSize.medium,
  color: TextColor.primary,
};

export const Small = Template.bind({});
Small.args = {
  text: 'Non consequat duis exercitation magna reprehenderit Lorem irure consectetur in aliqua.',
  size: TextSize.small,
  color: TextColor.primary,
};
