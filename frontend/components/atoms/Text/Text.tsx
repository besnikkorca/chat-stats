import classnames from 'classnames';
import { TextSize, TextAlign, TextColor } from './constants';
import type { Props } from './types';
import styles from './Text.module.scss';

export default function Text({
  text,
  size = TextSize.small,
  color = TextColor.black,
  align = TextAlign.left,
}: Props): JSX.Element {
  return (
    <p
      className={classnames(
        styles.default,
        {
          [styles.xl]: size === TextSize.small,
          [styles.xl4]: size === TextSize.medium,
          [styles.xl5]: size === TextSize.large,
          [styles.xl7]: size === TextSize.xlarge,
        },
        {
          [styles.white]: color === TextColor.white,
          [styles.black]: color === TextColor.black,
          [styles.red]: color === TextColor.red,
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
