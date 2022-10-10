import Card from 'molecules/Card';
import FormInput from 'molecules/FormInput';
import { Props } from './types';
import styles from './LoginCard.module.scss';
import Button from 'atoms/Button';

export default function LoginCard({ email, setEmail, password, setPassword, onLogin }: Props) {
  return (
    <Card>
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
        <Button text="login" onClick={onLogin} />
      </div>
    </Card>
  );
}
