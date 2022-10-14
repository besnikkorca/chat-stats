import { Props } from './types';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { ReactNode } from 'react';
import Input from 'atoms/Input';
import Icon from 'atoms/Icon';
import { IconName } from 'atoms/Icon/constants';
import CTAArea from './CTAArea';

function readableText(str: string | ReactNode, isActive: boolean) {
  if (isActive || typeof str !== 'string') return str;

  return str.length > 100 ? `${str.slice(0, 100)}...` : str;
}

export default function Table<T>({
  idKey = 'id' as keyof T,
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
      {setSearch && <CTAArea search={search} setSearch={setSearch} />}
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
              key={entry[idKey].toString()}
              onClick={() => 'setActive' in rest && rest.setActive(entry[idKey].toString())}
            >
              {indexed && <td>{idx + 1}</td>}
              {headers.map((header) => (
                <td key={header.toString()}>
                  {'editable' in rest &&
                  rest.active?.[idKey] === entry[idKey] &&
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
                    readableText(
                      entry[header],
                      'active' in rest && rest.active?.[idKey] === entry[idKey]
                    )
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
