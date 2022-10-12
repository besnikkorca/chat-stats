import { GenericVoidFunc } from 'types/global';

type SharedProps<T> = {
  width?: 'full';
  indexed?: boolean;
  headers: (keyof T)[];
  entries: { [K in keyof T]: string | JSX.Element }[];
};

type EditableProps<T> = SharedProps<T> & {
  active: T | null;
  setActive: (idx: string) => void;
  editable: (keyof T)[];
  onEdit: (header: keyof T) => GenericVoidFunc;
};

export type Props<T> = SharedProps<T> | EditableProps<T>;
