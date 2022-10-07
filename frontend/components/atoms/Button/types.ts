import { ButtonSize } from './constants';

export type Props = {
  text: string;
  size?: ButtonSize;
  primary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
};
