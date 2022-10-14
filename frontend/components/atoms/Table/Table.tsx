import { Props } from './types';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import Input from 'atoms/Input';
import Button from 'atoms/Button';
import { ButtonSize } from 'atoms/Button/constants';
import { BsFillTrashFill } from 'react-icons/bs';
import Icon from 'atoms/Icon';
import { IconName } from 'atoms/Icon/constants';
import Spinner from 'atoms/Spinner';
import CommandPattern from 'utils/CommandPattern';

function readableText(str: string | ReactNode, isActive: boolean) {
  if (isActive || typeof str !== 'string') return str;

  return str.length > 100 ? `${str.slice(0, 100)}...` : str;
}

export default function Table<T extends { id: string }>({
  indexed = true,
  sortable = false,
  sortBy = null,
  width,
  headers,
  setSortBy,
  entries,
  search,
  setSearch,
  onDelete,
  isLoadingDelete,
  ...rest
}: Props<T>) {
  return (
    <div>
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
      <table className={classNames(styles.table, { [styles.full]: width === 'full' })}>
        <thead>
          <tr>
            {indexed && <th>#</th>}
            {headers.map((header) => (
              <th key={header.toString()}>
                <div
                  className={styles.header}
                  onClick={() => sortable && setSortBy?.(sortBy === header ? null : header)}
                >
                  <i className={sortBy === header ? styles.sortAsc : styles.sortDesc} />
                  {header.toString()}
                </div>
              </th>
            ))}
            {onDelete && <th>Actions</th>}
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
              {onDelete && (
                <td>
                  <Icon
                    isLoading={isLoadingDelete}
                    onClick={() => onDelete(entry)}
                    name={IconName.bin}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
