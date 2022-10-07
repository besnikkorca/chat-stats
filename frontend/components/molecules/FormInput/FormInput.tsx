import Input from 'atoms/Input';
import Label from 'atoms/Label';
import styles from './FormInput.module.scss';
import { Props } from './types';

export default function FormInput({ label, placeholder, onChange, value, autoFocus, type }: Props) {
  return (
    <div className={styles.formInput}>
      <Label aria-label={label}>{label}</Label>
      <Input
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
