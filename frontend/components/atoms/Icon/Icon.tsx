import { IconName } from './constants';
import { Props } from './types';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import styles from './Icon.module.scss';
import classNames from 'classnames';

function getIconComp(name: IconName) {
  switch (name) {
    default:
    case IconName.bin:
      return BsFillTrashFill;
    case IconName.caretLeft:
      return AiFillCaretLeft;
    case IconName.caretRight:
      return AiFillCaretRight;
  }
}

export default function Icon({ disabled, isLoading, onClick, name }: Props) {
  const IconComp = getIconComp(name);
  return (
    <IconComp
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
      className={classNames(styles.icon, {
        [styles.isLoading]: disabled || isLoading,
        [styles.bin]: name === IconName.bin,
        [styles.caretLeft]: name === IconName.caretLeft,
        [styles.caretRight]: name === IconName.caretRight,
      })}
    />
  );
}
