import { GenericVoidFunc } from 'types/global';
import { IconName } from './constants';

export type Props = {
  onClick?: GenericVoidFunc;
  name: IconName;
  isLoading?: boolean;
  disabled?: boolean;
};
