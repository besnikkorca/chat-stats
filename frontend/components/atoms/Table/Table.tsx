import { Props } from './types';
import styles from './Table.module.scss';
import classNames from 'classnames';

export default function Table({ indexed = true, width, headers, entries }: Props) {
  return (
    <table className={classNames(styles.table, { [styles.full]: width === 'full' })}>
      <thead>
        <tr>
          {indexed && <th>#</th>}
          {headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, idx) => (
          <tr>
            {indexed && <td>{idx + 1}</td>}
            {entry.map((cell) => (
              <td>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
