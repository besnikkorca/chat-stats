import BurgerMenu from 'components/BurgerMenu';
import useUserData from 'contexts/User/useUserData';
import Image from 'next/image';
import styles from './Header.module.scss';
import cookies from 'js-cookie';
import { Cookie } from 'types/cookies';

export default function Header() {
  const { user, setExpirationToken } = useUserData();
  return (
    <nav className={styles.wrapper}>
      <div className={styles.leftNav}>
        <div className={styles.logo}>
          <Image src="/zettablock.jpg" alt="ZettaBlock Logo" width={60} height={60} />
        </div>
        <ul className={styles.navigation}>
          <li className={styles.item}>About</li>
          <li className={styles.item}>Portfolio</li>
          <li className={styles.item}>Portfolio</li>
        </ul>
      </div>
      <div className={styles.userArea}>
        {user ? (
          <>
            <h2>Hello {user.username}</h2>
            <BurgerMenu
              options={[
                {
                  label: 'Profile',
                  onClick: () => {
                    alert('not implemented yet');
                  },
                },
                {
                  label: 'Logout',
                  onClick: () => {
                    cookies.remove(Cookie.token_expiration);
                    setExpirationToken(null);
                  },
                },
              ]}
            />
          </>
        ) : (
          <ul>
            <li>Login</li>
            <li>Register</li>
          </ul>
        )}
      </div>
    </nav>
  );
}
