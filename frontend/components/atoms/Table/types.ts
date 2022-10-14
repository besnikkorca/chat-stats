import { GenericVoidFunc } from 'types/global';

type SharedProps<T> = {
  width?: 'full';
  idKey: keyof T;
  indexed?: boolean;
  headers: (keyof T)[];
  entries: { [K in keyof T]: string | JSX.Element }[];
  sortable?: boolean;
  sortBy?: keyof T | null;
  setSortBy?: GenericVoidFunc;
  onDelete?: GenericVoidFunc;
  isLoadingDelete?: boolean;
};

type EditableProps<T> = SharedProps<T> & {
  active: T | null;
  setActive: (idx: string) => void;
  editable: (keyof T)[];
  onEdit: (header: keyof T) => GenericVoidFunc;
};

export type CTAAreaProps = {
  search?: string;
  setSearch?: GenericVoidFunc;
};

export type Props<T> = CTAAreaProps & (SharedProps<T> | EditableProps<T>);
