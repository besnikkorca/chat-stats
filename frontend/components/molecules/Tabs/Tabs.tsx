import { Props } from './types';
import styles from './Tabs.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

export default function Tabs({ panes = [] }: Props) {
  const [active, setActive] = useState<string | null>(panes.length > 0 ? panes[0].name : null);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {panes.map((pane, idx) => (
          <div
            className={classNames(styles.tab, active === pane.name && styles.active)}
            onClick={() => setActive(pane.name)}
          >
            {pane.name}
          </div>
        ))}
      </div>
      <div className={styles.content}>{panes.find((pane) => pane.name === active)?.content}</div>
    </div>
  );
}
