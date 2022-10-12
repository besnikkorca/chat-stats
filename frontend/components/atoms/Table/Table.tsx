import { Props } from './types';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import Input from 'atoms/Input';

function readableText(str: string | ReactNode, isActive: boolean) {
  if (isActive || typeof str !== 'string') return str;

  return str.length > 100 ? `${str.slice(0, 100)}...` : str;
}

export default function Table<T extends { id: string }>({
  indexed = true,
  width,
  headers,
  entries,
  ...rest
}: Props<T>) {
  return (
    <table className={classNames(styles.table, { [styles.full]: width === 'full' })}>
      <thead>
        <tr>
          {indexed && <th>#</th>}
          {headers.map((header) => (
            <th key={header.toString()}>{header.toString()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, idx) => (
          <tr
            key={entry.id.toString()}
            onClick={() => 'setActive' in rest && rest.setActive(entry.id.toString())}
          >
            {indexed && <td>{idx + 1}</td>}
            {headers.map((header) => (
              <td key={header.toString()}>
                {'editable' in rest &&
                rest.active?.id === entry.id &&
                rest.editable.includes(header) ? (
                  <Input
                    autoFocus
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    value={rest.active[header]?.toString()}
                    onChange={rest.onEdit(header)}
                  />
                ) : (
                  readableText(entry[header], 'active' in rest && rest.active?.id === entry.id)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
