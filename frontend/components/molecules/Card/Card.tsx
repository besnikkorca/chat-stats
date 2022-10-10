import Button from 'atoms/Button';
import Input from 'atoms/Input';
import FormInput from 'molecules/FormInput/FormInput';
import { useState } from 'react';
import styles from './Card.module.scss';
import { Props } from './types';

export default function Card({ children }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Welcome to ZettaBlock</h1>
      <div className={styles.form}>{children}</div>
    </div>
  );
}
