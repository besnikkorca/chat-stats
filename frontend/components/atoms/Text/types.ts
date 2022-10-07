import { TextAlign, TextColor, TextSize } from './constants';

export type Props = {
  text: string;
  size?: TextSize;
  color?: TextColor;
  align?: TextAlign;
};
