import classnames from 'classnames';
import { TextSize, TextAlign, TextColor } from './constants';
import type { Props } from './types';
import styles from './Text.module.scss';

export default function Text({
  text,
  size = TextSize.small,
  color = TextColor.secondary,
  align = TextAlign.left,
}: Props): JSX.Element {
  return (
    <p
      className={classnames(
        styles.default,
        {
          [styles.small]: size === TextSize.small,
          [styles.medium]: size === TextSize.medium,
          [styles.large]: size === TextSize.large,
          [styles.xlarge]: size === TextSize.xlarge,
        },
        {
          [styles.primary]: color === TextColor.primary,
          [styles.secondary]: color === TextColor.secondary,
          [styles.ternary]: color === TextColor.ternary,
        },
        {
          [styles.left]: align === TextAlign.left,
          [styles.right]: align === TextAlign.right,
          [styles.center]: align === TextAlign.center,
        }
      )}
    >
      {text}
    </p>
  );
}
