import { ButtonSize } from './constants';
import TestId from 'types/TestId';
import type { Props } from './types';
import styles from './Button.module.scss';
import classNames from 'classnames';

export default function Button({
  primary = true,
  text,
  size = ButtonSize.normal,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      disabled={disabled}
      data-testid={TestId.button}
      type="button"
      className={classNames(
        styles.default,
        primary ? styles.primary : styles.secondary,
        size === ButtonSize.normal ? styles.normal : styles.large
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
