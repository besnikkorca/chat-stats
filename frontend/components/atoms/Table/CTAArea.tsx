import styles from './Table.module.scss';
import Input from 'atoms/Input';
import Icon from 'atoms/Icon';
import { IconName } from 'atoms/Icon/constants';
import CommandPattern from 'utils/CommandPattern';
import { CTAAreaProps } from './types';

export default function CTAArea({ search, setSearch }: CTAAreaProps) {
  return (
    <div className={styles.ctaArea}>
      <Icon
        disabled={CommandPattern.undoSize() === 0}
        onClick={CommandPattern.undo}
        name={IconName.caretLeft}
      />
      <Icon
        disabled={CommandPattern.redoSize() === 0}
        onClick={CommandPattern.redo}
        name={IconName.caretRight}
      />
      &nbsp;
      <Input placeholder="search..." value={search} onChange={setSearch} />
    </div>
  );
}
