import { IconName } from './constants';
import { Props } from './types';
import { BsFillTrashFill } from 'react-icons/bs';
import styles from './Icon.module.scss';
import classNames from 'classnames';

function getIconComp(name: IconName) {
  switch (name) {
    default:
    case IconName.bin:
      return BsFillTrashFill;
  }
}

export default function Icon({ isLoading, onClick, name }: Props) {
  const IconComp = getIconComp(name);
  return (
    <IconComp
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
      className={classNames(styles.icon, {
        [styles.isLoading]: isLoading,
        [styles.bin]: name === IconName.bin,
      })}
    />
  );
}
