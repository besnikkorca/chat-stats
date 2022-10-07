export interface Props {
  width?: 'full';
  indexed?: boolean;
  headers: string[];
  entries: (string | JSX.Element)[][];
}
