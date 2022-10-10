import styles from './BurgerMenu.module.scss';
import { Props } from './types';

export default function BurgerMenu({ options }: Props) {
  return (
    <>
      <input id={styles.menuToggle} type="checkbox" />
      <label className={styles.menuButtonContainer} htmlFor={styles.menuToggle}>
        <div className={styles.menuButton}></div>
      </label>
      <ul className={styles.menu}>
        {options.map(({ label, onClick }) => (
          <li key={label} onClick={onClick}>
            {label}
          </li>
        ))}
      </ul>
    </>
  );
}
