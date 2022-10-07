import classNames from 'classnames';
import styles from './Label.module.scss';
import { Props } from './types';

export default function Label({ className, ...props }: Props) {
  return <label {...props} className={classNames(styles.label, className)} />;
}
