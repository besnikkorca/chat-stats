import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="https://zettablock.com" target="_blank" rel="noopener noreferrer">
        Powered by &nbsp;
        <span className={styles.logo}>
          <Image src="/zettablock.jpg" alt="ZettaBlock Logo" width={60} height={60} />
        </span>
      </a>
    </footer>
  );
}
