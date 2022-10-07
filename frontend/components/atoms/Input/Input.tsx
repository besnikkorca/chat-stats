import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import styles from './Input.module.scss';
import { Props } from './types';

export default function Input({ className, autoFocus, onChange, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [ref.current, autoFocus]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <input
      {...props}
      ref={ref}
      className={classNames(styles.input, className)}
      onChange={handleOnChange}
    />
  );
}
