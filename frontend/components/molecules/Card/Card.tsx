import Button from 'atoms/Button';
import Input from 'atoms/Input';
import FormInput from 'molecules/FormInput/FormInput';
import { useState } from 'react';
import styles from './Card.module.scss';

export default function Card() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Welcome to ZettaBlock</h1>
      <div className={styles.form}>
        <FormInput
          value={email}
          onChange={setEmail}
          autoFocus={true}
          label="Email"
          placeholder="Enter your email"
        />
        <FormInput
          value={password}
          onChange={setPassword}
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
        <div className={styles.ctaArea}>
          <Button text="login" />
        </div>
      </div>
    </div>
  );
}
