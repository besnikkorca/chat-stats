import { HTMLInputTypeAttribute } from 'react';
import type { GenericVoidFunc, Value } from 'types/global';

export type Props = {
  label: string;
  placeholder: string;
  value: Value;
  onChange?: GenericVoidFunc;
  autoFocus?: boolean | undefined;
  type?: HTMLInputTypeAttribute | undefined;
};
