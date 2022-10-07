import { GenericVoidFunc } from 'types/global';

export type Props = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange'
> & { onChange?: GenericVoidFunc };
